process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT:', err.message);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED:', err);
});

require('dotenv').config();

const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const publicDir = path.join(__dirname, 'public');

app.use(express.json({ limit: '10mb' }));
app.use(express.static(publicDir));

app.get('/', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.post('/api/chat', (req, res) => {
  try {
    const apiKey = process.env.ZHIPU_API_KEY;
    if (!apiKey || !String(apiKey).trim()) {
      if (!res.headersSent) {
        res.status(503).json({ error: 'ZHIPU_API_KEY 未配置，请在环境变量中设置。' });
      }
      return;
    }

    const { model, messages, stream } = req.body;
    const isStream = stream !== false;

    const postData = JSON.stringify({
      model: model || 'glm-4-flash',
      messages,
      stream: isStream,
      temperature: 0.7,
      max_tokens: 8192,
    });

    const options = {
      hostname: 'open.bigmodel.cn',
      port: 443,
      path: '/api/paas/v4/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const apiReq = https.request(options, (apiRes) => {
      if (apiRes.statusCode !== 200) {
        let errBody = '';
        apiRes.on('data', (chunk) => {
          errBody += chunk;
        });
        apiRes.on('end', () => {
          res.status(apiRes.statusCode).json({ error: errBody });
        });
        return;
      }

      if (isStream) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');
        apiRes.pipe(res);
        return;
      }

      let body = '';
      apiRes.on('data', (chunk) => {
        body += chunk;
      });
      apiRes.on('end', () => {
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
      });
    });

    apiReq.on('error', (err) => {
      console.error('API request error:', err.message);
      if (!res.headersSent) {
        res.status(500).json({ error: err.message });
      }
    });

    apiReq.write(postData);
    apiReq.end();
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
