// @see https://github.com/facebook/create-react-app/issues/5367
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    createProxyMiddleware("/video", {
      target: "https://stayinshape.s3.eu-west-3.amazonaws.com",
      changeOrigin: true,
      onProxyReq(proxyReq) {
        if (proxyReq.getHeader("origin")) {
          proxyReq.setHeader("origin", "https://stayinshape.s3.eu-west-3.amazonaws.com")
        }
      },
      secure: false,
      pathRewrite: { "^/video": "" },
      logLevel: "debug",
    }));
}
