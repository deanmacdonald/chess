const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 8080;

app.use('/auth', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true }));
app.use('/game', createProxyMiddleware({ target: 'http://localhost:4001', changeOrigin: true }));
app.use('/chat', createProxyMiddleware({ target: 'http://localhost:4002', changeOrigin: true }));
app.use('/user', createProxyMiddleware({ target: 'http://localhost:4003', changeOrigin: true }));
app.use('/notification', createProxyMiddleware({ target: 'http://localhost:4004', changeOrigin: true }));
app.use('/analytics', createProxyMiddleware({ target: 'http://localhost:4005', changeOrigin: true }));
app.use('/billing', createProxyMiddleware({ target: 'http://localhost:4006', changeOrigin: true }));

app.listen(PORT, () => {
  console.log('API Gateway running on port', PORT);
});
