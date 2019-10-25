// @see https://github.com/facebook/create-react-app/issues/5367
/*const setupProxy = require('http-proxy-middleware');

function apiURL() {
  const baseURL = process.env.API_URL;
  if (baseURL && baseURL !== "")
    return baseURL

  switch (process.env.NODE_ENV) {
    case 'development':
       return 'https://management-stg.api.soundcast.fm';
    case 'production':
      return 'https://management.api.soundcast.fm';
    default:
      return 'https://management-stg.api.soundcast.fm';
  }
}

module.exports = app => {
  app.use(
    setupProxy("/", {
      target: "https://cdn.plyr.io",
      changeOrigin: true,
      onProxyReq(proxyReq) {
        if (proxyReq.getHeader("origin")) {
          proxyReq.setHeader("origin", apiURL())
        }
      },
      secure: false,
      pathRewrite: { "^/": "" },
      logLevel: "debug",
    })
  );
  /*process.env.NODE_ENV === 'development' ?
  app.use(
    setupProxy("/vastCreation-staging", {
      target: "https://europe-west1-soundcast-207722.cloudfunctions.net",
      changeOrigin: true,
      onProxyReq(proxyReq) {
        proxyReq.setHeader("origin", "https://europe-west1-soundcast-207722.cloudfunctions.net")
      },
      secure: false,
      logLevel: "debug",
    })
  ) : ''
};*/
