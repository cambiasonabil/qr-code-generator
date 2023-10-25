const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/favicon',
    createProxyMiddleware({
      target: 'https://www.google.com/s2/favicons',
      changeOrigin: true,
      pathRewrite: {
        '^/favicon': '/',
      },
    })
  );
};
