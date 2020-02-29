const paths = require('./paths');
const fs = require('fs');

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
    port: 9001,
    historyApiFallback: {
      disableDotRule: true,
    },
    before(app, server) {
      if (fs.existsSync(paths.proxySetup)) {
        require(paths.proxySetup)(app);
      }
    },
  },
};
