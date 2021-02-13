const fs = require('fs');
const paths = require('./paths');

const overlay = process.env.NODE_ENV === 'development' ? { warnings: false, errors: true } : false;

module.exports = {
    devServer: {
      stats: {
        children: false,
        maxModules: 0,
      },
      hot: true,
      inline: true,
      open: true,
      clientLogLevel: 'none',
      overlay: overlay,
      publicPath: '/',
      contentBase: paths.appPublic,
      watchContentBase: true,
      port: 8181,
      historyApiFallback: {
        disableDotRule: true,
      },
      onListening: function(server) {
        const port = server.listeningApp.address().port;
        console.log('Listening on port:', port);
      },
      before(app, server) {
        if (fs.existsSync(paths.proxySetup)) {
          require(paths.proxySetup)(app);
        }
      },
    },
};
