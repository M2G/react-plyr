// @see https://github.com/facebook/create-react-app/issues/5367
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    createProxyMiddleware("/sso-ws", {
      target: "https://example.com",
      changeOrigin: true,
      onProxyReq(proxyReq) {
        if (proxyReq.getHeader("origin")) {
          proxyReq.setHeader("origin", "example.com")
        }
      },
      secure: false,
      pathRewrite: { "^/": "" },
      logLevel: "debug",
    }));
    app.use(
      createProxyMiddleware("/video-ws", {
        target: "https://example.com",
        changeOrigin: true,
        onProxyReq(proxyReq) {
          if (proxyReq.getHeader("origin")) {
            proxyReq.setHeader("origin", "https://encoding.stayinshape.fit")
          }
        },
        secure: false,
        pathRewrite: { "^/video-ws": "" },
        logLevel: "debug",
      }));
}
