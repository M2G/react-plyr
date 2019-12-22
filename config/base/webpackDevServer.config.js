module.exports = {
  devServer: {
    stats: {
      children: false,
      maxModules: 0
    },
    hot: true,
    inline: true,
    open: true,
    clientLogLevel: 'none',
    overlay: {
      warnings: false,
      errors: true
    },
    contentBase: './public/',
    watchContentBase: true,
    port: 8484,
    historyApiFallback: {
      disableDotRule: true,
    },
    before(app, server) {
      console.log('app', app)
      // if (fs.existsSync(paths.proxySetup)) {
      // This registers user provided middleware for proxy reasons
      // require(paths.proxySetup)(app);
      // }
    }
  }
};
