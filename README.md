# WeMoreAI Virtual Lab

一个基于 Express 的单页应用，首页静态文件通过 `public/index.html` 提供，后端接口通过 `server.js` 代理智谱模型接口。

## 本地运行

1. 安装依赖：`npm install`
2. 复制 `.env.example` 为 `.env`
3. 填写环境变量
4. 启动服务：`npm run dev`

默认本地地址：`http://localhost:3000`

## 环境变量

### 必填

- `ZHIPU_API_KEY`
  - 用途：服务端请求智谱 `open.bigmodel.cn` 接口时的鉴权密钥
  - 使用位置：`server.js`

### 可选

- `PORT`
  - 用途：本地开发时指定服务端口
  - 默认值：`3000`

- `VERCEL`
  - 用途：Vercel 平台自动注入，存在时服务端不会执行本地 `app.listen`
  - 说明：这个变量不需要手动设置

## Vercel 部署

这个项目已经整理成可部署到 Vercel 的结构：

- 静态首页位于 `public/index.html`
- API 入口位于 `server.js`
- `vercel.json` 已配置 `server.js` 的函数运行时参数

部署时只需要在 Vercel 项目里补上：

- `ZHIPU_API_KEY`

## 代码结构

- `public/index.html`：前端页面
- `server.js`：Express API 服务
- `.env.example`：环境变量示例
- `vercel.json`：Vercel 配置
