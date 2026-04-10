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
    description: '偏向低成本与高吞吐，适合提纲和快速试跑。',
    provider: 'deepseek',
    envKey: 'DEEPSEEK_API_KEY',
    endpoint: 'https://api.deepseek.com/chat/completions',
    model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
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
    description: '偏向高质量交互界面与成品感，适合最终导出版本。',
    provider: 'moonshot',
    envKey: 'MOONSHOT_API_KEY',
    endpoint: 'https://api.moonshot.cn/v1/chat/completions',
    model: process.env.MOONSHOT_MODEL || 'kimi-k2.5',
  },
};

function listPresets() {
  return Object.values(MODEL_PRESETS).map((preset) => ({
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
      temperature = 0.5,
      max_tokens = 8192,
      top_p,
      thinking,
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
      max_tokens,
    };

    if (typeof temperature === 'number' && selected.provider !== 'moonshot') {
      payload.temperature = temperature;
    }

    if (typeof top_p === 'number' && selected.provider !== 'moonshot') {
      payload.top_p = top_p;
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

    for (let attempt = 1; attempt <= 3; attempt += 1) {
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
      const shouldRetryMoonshot =
        selected.provider === 'moonshot' &&
        attempt < 3 &&
        (upstream.status === 429 ||
          upstream.status >= 500 ||
          upstreamErrorText.includes('engine_overloaded_error') ||
          upstreamErrorText.includes('try again later'));

      if (!shouldRetryMoonshot) {
        break;
      }

      await sleep(900 * attempt);
    }

    if (!upstream.ok) {
      const text = upstreamErrorText;
      res.status(upstream.status).json({
        error: text || `${selected.provider} 请求失败`,
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
