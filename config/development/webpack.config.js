const baseConfig = require('../base/webpack.config');
const optimization = require('./optimization');
const output = require('./output');
const plugins = require('./plugins');
const rules = require('./rules');
const { devServer } = require('../base/webpackDevServer.config');

module.exports = Object.assign({}, baseConfig, {
  mode: 'development',
  devServer,
  devtool: 'cheap-module-source-map',
  output,
  optimization,
  module: {
    rules
  },
  plugins
});
