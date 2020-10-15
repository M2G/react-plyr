const path = require('path');
const entry = require('./entry');
const plugins = require('./plugins');

module.exports = {
  context: process.cwd(),
  entry,
  resolve: {
    modules: [
      path.resolve(__dirname, '../../src'),
      'node_modules'
    ],
    extensions: ['*', '.js', '.jsx', '.json', '.tsx', '.ts', '.scss'],
    alias: {
      "@constants": path.join(process.cwd(), 'src', 'constants'),
      "@utils": path.join(process.cwd(), 'src', 'utils'),
    }
  },
  plugins,
  node: {
    fs: 'empty',
    mode: 'empty',
    module: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  performance: false
};
