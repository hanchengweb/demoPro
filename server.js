process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT:', err.message);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED:', err);
});

require('dotenv').config();

const express = require('express');
const path = require('path');
const { Readable } = require('stream');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const publicDir = path.join(__dirname, 'public');
const rootIndexFile = path.join(__dirname, 'index.html');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MODEL_PRESETS = {
  quick: {
    id: 'quick',
    label: '快速',
    description: '偏向低成本与高吞吐，适合提纲、试跑和快速迭代。',
    provider: 'deepseek',
    envKey: 'DEEPSEEK_API_KEY',
    endpoint: 'https://api.deepseek.com/chat/completions',
    model: process.env.DEEPSEEK_QUICK_MODEL || 'deepseek-v4-flash',
    defaults: {
      thinking: { type: 'disabled' },
      temperature: 0.45,
      top_p: 0.85,
    },
  },
  balanced: {
    id: 'balanced',
    label: '平衡',
    description: '默认推荐，兼顾中文理解、代码稳定性与视觉表现。',
    provider: 'zhipu',
    envKey: 'ZHIPU_API_KEY',
    endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    model: process.env.ZHIPU_MODEL || 'glm-5.1',
  },
  premium: {
    id: 'premium',
    label: '精品',
    description: '使用 DeepSeek V4 Pro，偏向复杂推理、交互完成度与最终成品质量。',
    provider: 'deepseek',
    envKey: 'DEEPSEEK_API_KEY',
    endpoint: 'https://api.deepseek.com/chat/completions',
    model: process.env.DEEPSEEK_MODEL || 'deepseek-v4-pro',
    defaults: {
      thinking: { type: 'enabled' },
      reasoning_effort: 'max',
      temperature: 0.55,
      top_p: 0.9,
    },
  },
  kimiHidden: {
    id: 'kimiHidden',
    label: 'Kimi 隐藏备份',
    description: '保留旧版 Kimi 接入，不在界面展示。',
    provider: 'moonshot',
    envKey: 'MOONSHOT_API_KEY',
    endpoint: 'https://api.moonshot.cn/v1/chat/completions',
    model: process.env.MOONSHOT_MODEL || 'kimi-k2.5',
    hidden: true,
  },
};

function listPresets() {
  return Object.values(MODEL_PRESETS)
    .filter((preset) => !preset.hidden)
    .map((preset) => ({
    id: preset.id,
    label: preset.label,
    description: preset.description,
    provider: preset.provider,
    model: preset.model,
    available: Boolean(process.env[preset.envKey]),
  }));
}

function getDefaultPresetId() {
  const presets = listPresets();
  const preferredOrder = ['premium', 'balanced', 'quick'];

  for (const id of preferredOrder) {
    const matched = presets.find((item) => item.id === id && item.available);
    if (matched) {
      return matched.id;
    }
  }

  return 'balanced';
}

function resolvePreset(requestedPreset) {
  const target = MODEL_PRESETS[requestedPreset] || MODEL_PRESETS[getDefaultPresetId()];
  if (target && process.env[target.envKey]) {
    return target;
  }
  return requestedPreset ? null : (Object.values(MODEL_PRESETS).find((item) => process.env[item.envKey]) || target);
}

function pickProviderError() {
  const configured = listPresets().filter((item) => item.available);
  if (configured.length > 0) {
    return null;
  }

  return {
    status: 503,
    body: {
      error: '未检测到可用模型密钥。请至少配置 ZHIPU_API_KEY、DEEPSEEK_API_KEY、MOONSHOT_API_KEY 之一。',
      presets: listPresets(),
    },
  };
}

function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter((item) => item && typeof item.role === 'string' && item.content != null)
    .map((item) => ({
      role: item.role,
      content: item.content,
    }));
}

function normalizeProviderError(selected, text = '', status = 500) {
  if (selected?.provider === 'deepseek') {
    if (/insufficient balance|余额不足/i.test(text)) {
      return 'DeepSeek 余额不足，请充值后重试。';
    }
    if (/rate limit|too many requests/i.test(text)) {
      return 'DeepSeek 请求过于频繁，请稍后再试。';
    }
    if (/context length|maximum context|max context/i.test(text)) {
      return 'DeepSeek 输入内容过长，请精简提示词或附件后重试。';
    }
    if (/invalid.*reasoning_effort|invalid.*thinking/i.test(text)) {
      return 'DeepSeek 推理参数不兼容，已建议切换为默认配置后重试。';
    }
    return text || 'DeepSeek 官方接口返回异常，请稍后重试。';
  }

  if (/engine_overloaded_error|try again later/i.test(text)) {
    return 'Kimi 当前繁忙，已自动重试多次仍未成功，请稍后再试。';
  }
  if (/invalid temperature/i.test(text)) {
    return 'Kimi 参数校验未通过，已拦截不兼容参数；请重试。';
  }
  if (/context length|maximum context|max context/i.test(text)) {
    return 'Kimi 输入内容过长，请精简提示词或附件后重试。';
  }
  if (/rate limit|too many requests/i.test(text)) {
    return 'Kimi 请求过于频繁，请稍后再试。';
  }

  return text || 'Kimi 官方接口返回异常，请稍后重试。';
}

app.use(express.json({ limit: '10mb' }));
app.use(express.static(publicDir, { index: false }));

app.get('/', (_req, res) => {
  res.sendFile(rootIndexFile);
});

app.get('/api/models', (_req, res) => {
  res.json({
    defaultPreset: getDefaultPresetId(),
    presets: listPresets(),
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const providerError = pickProviderError();
    if (providerError) {
      res.status(providerError.status).json(providerError.body);
      return;
    }

    const {
      preset,
      model,
      messages,
      stream = true,
      temperature = 1.0,
      max_tokens,
      top_p,
      thinking,
      reasoning_effort,
      tools,
      tool_choice,
    } = req.body || {};

    const selected = resolvePreset(preset);
    if (!selected || !process.env[selected.envKey]) {
      res.status(503).json({
        error: `预设 ${preset || 'balanced'} 未配置可用密钥。`,
        presets: listPresets(),
      });
      return;
    }

    const normalizedMessages = sanitizeMessages(messages);
    if (normalizedMessages.length === 0) {
      res.status(400).json({ error: 'messages 不能为空。' });
      return;
    }

    const payload = {
      model: model || selected.model,
      messages: normalizedMessages,
      stream: stream !== false,
    };

    if (typeof max_tokens === 'number' && Number.isFinite(max_tokens) && max_tokens > 0) {
      payload.max_tokens = max_tokens;
    }

    const resolvedTemperature = typeof temperature === 'number'
      ? temperature
      : selected.defaults?.temperature;
    if (typeof resolvedTemperature === 'number' && selected.provider !== 'moonshot') {
      payload.temperature = resolvedTemperature;
    }

    const resolvedTopP = typeof top_p === 'number' ? top_p : selected.defaults?.top_p;
    if (typeof resolvedTopP === 'number' && selected.provider !== 'moonshot') {
      payload.top_p = resolvedTopP;
    }

    if (selected.provider === 'deepseek') {
      const resolvedThinking = thinking && typeof thinking === 'object'
        ? thinking
        : selected.defaults?.thinking;

      if (resolvedThinking && typeof resolvedThinking === 'object') {
        payload.thinking = resolvedThinking;
      }

      const thinkingEnabled = payload.thinking?.type !== 'disabled';
      if (thinking && typeof thinking === 'object') {
        payload.thinking = thinking;
      }

      const resolvedReasoningEffort = reasoning_effort || selected.defaults?.reasoning_effort;
      if (thinkingEnabled && resolvedReasoningEffort) {
        payload.reasoning_effort = resolvedReasoningEffort;
      }
    }

    if (selected.provider === 'moonshot') {
      if (thinking && typeof thinking === 'object') {
        payload.thinking = thinking;
      }

      if (Array.isArray(tools) && tools.length > 0) {
        payload.tools = tools;
      }

      if (tool_choice) {
        payload.tool_choice = tool_choice;
      }
    }

    let upstream;
    let upstreamErrorText = '';

    const maxAttempts = selected.provider === 'moonshot' ? 5 : 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      upstream = await fetch(selected.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env[selected.envKey]}`,
        },
        body: JSON.stringify(payload),
      });

      if (upstream.ok) {
        break;
      }

      upstreamErrorText = await upstream.text();
      const shouldRetry =
        attempt < maxAttempts &&
        (
          upstream.status === 429 ||
          upstream.status >= 500 ||
          (
            selected.provider === 'moonshot' &&
            (upstreamErrorText.includes('engine_overloaded_error') ||
             upstreamErrorText.includes('try again later'))
          )
        );

      if (!shouldRetry) {
        break;
      }

      await sleep(selected.provider === 'moonshot' ? 1200 * attempt : 900 * attempt);
    }

    if (!upstream.ok) {
      const text = upstreamErrorText;
      res.status(upstream.status).json({
        error: normalizeProviderError(selected, text, upstream.status),
        provider: selected.provider,
        model: payload.model,
      });
      return;
    }

    if (payload.stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');
      res.setHeader('X-Model-Preset', selected.id);
      res.setHeader('X-Model-Provider', selected.provider);

      if (!upstream.body) {
        res.end();
        return;
      }

      Readable.fromWeb(upstream.body).pipe(res);
      return;
    }

    const contentType = upstream.headers.get('content-type') || 'application/json';
    const text = await upstream.text();
    res.setHeader('Content-Type', contentType);
    res.setHeader('X-Model-Preset', selected.id);
    res.setHeader('X-Model-Provider', selected.provider);
    res.send(text);
  } catch (err) {
    console.error('Server error:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
});

if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log('\nWeMoreAI 智能虚拟实验生成平台');
    console.log(`   本地访问: http://localhost:${PORT}`);
    console.log('   按 Ctrl+C 停止服务\n');
  });
}

module.exports = app;
