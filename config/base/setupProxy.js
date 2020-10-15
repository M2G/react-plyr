// @see https://github.com/facebook/create-react-app/issues/5367
const { createProxyMiddleware } = require('http-proxy-middleware');

function apiURL() {
  const baseURL = process.env.API_URL;
  if (baseURL && baseURL !== "")
    return baseURL;

  switch (process.env.NODE_ENV) {
    case 'development':
       return 'https://sso.stayinshape.fit';
    case 'production':
      return 'https://sso.stayinshape.fit';
    default:
      return 'https://sso.stayinshape.fit';
  }
}

console.log(':::::', apiURL())

module.exports = app => {
  app.use(
    createProxyMiddleware("/rest", {
      target: apiURL(),
      changeOrigin: true,
      onProxyReq(proxyReq) {
        if (proxyReq.getHeader("origin")) {
          proxyReq.setHeader("origin", apiURL())
        }
      },
      secure: false,
      pathRewrite: { "^/rest": "" },
      logLevel: "debug",
    })
  );
  // ANOTHER SERVICE
  /*
  app.use(
    setupProxy("/ENDPOINT", {
      target: "https://URL",
      changeOrigin: true,
      onProxyReq(proxyReq) {
        proxyReq.setHeader("origin", "https://URL")
      },
      secure: false,
      logLevel: "debug",
    })
  )
};*/
};
