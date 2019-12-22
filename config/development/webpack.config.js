const baseConfig = require('../base/webpack.config');
const output = require('./output');
const plugins = require('./plugins');
const rules = require('./rules');
const { devServer } = require('../base/webpackDevServer.config');

module.exports = Object.assign({}, baseConfig, {
  mode: 'development',
  devServer,
  devtool: 'cheap-module-source-map',
  output,
  module: {
    rules
  },
  plugins
});
