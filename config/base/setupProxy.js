// @see https://github.com/facebook/create-react-app/issues/5367
/* if you want to use a external service */

/*const { createProxyMiddleware } = require('http-proxy-middleware');

function apiURL() {
  const baseURL = process.env.API_URL;
  if (baseURL && baseURL !== '')
    return baseURL;
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'YOUR URL';
    case 'production':
      return 'YOUR URL';
    default:
      return 'YOUR URL';
  }
}

module.exports = app => {
  app.use(
    createProxyMiddleware('/rest', {
      target: apiURL(),
      changeOrigin: true,
      onProxyReq(proxyReq) {
        if (proxyReq.getHeader('origin')) {
          proxyReq.setHeader('origin', apiURL());
        }
      },
      secure: false,
      pathRewrite: { '^/rest': '' },
      logLevel: 'debug',
    }));
  process.env.NODE_ENV === 'development' ?
    app.use(
      createProxyMiddleware('/vastCreation-staging', {
        target: 'https://europe-west1-soundcast-207722.cloudfunctions.net',
        changeOrigin: true,
        onProxyReq(proxyReq) {
          proxyReq.setHeader('origin', 'https://europe-west1-soundcast-207722.cloudfunctions.net');
        },
        secure: false,
        logLevel: 'debug',
      })) : '';
};
*/
