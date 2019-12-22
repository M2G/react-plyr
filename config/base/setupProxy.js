// @see https://github.com/facebook/create-react-app/issues/5367
const setupProxy = require('http-proxy-middleware');

function apiURL() {
  const baseURL = process.env.API_URL;
  if (baseURL && baseURL !== "")
    return baseURL;

  switch (process.env.NODE_ENV) {
    case 'development':
       return 'https://reqres.in/api';
    case 'production':
      return 'https://reqres.in/api';
    default:
      return 'https://reqres.in/api';
  }
}

module.exports = app => {
  app.use(
    setupProxy("/rest", {
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
