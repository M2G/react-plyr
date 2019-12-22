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
      '@': path.join(process.cwd(), 'src'),
      "@adapters": path.join(process.cwd(), 'src', 'adapters'),
      "@components": path.join(process.cwd(), 'src', 'components'),
      "@config": path.join(process.cwd(), 'src', 'config'),
      "@constants": path.join(process.cwd(), 'src', 'constants'),
      "@actions": path.join(process.cwd(), 'src', 'actions'),
      "@helpers": path.join(process.cwd(), 'src', 'helpers'),
      "@store": path.join(process.cwd(), 'src', 'store'),
      "@models": path.join(process.cwd(), 'src', 'models'),
      "@stylesheets": path.join(process.cwd(), 'src', 'stylesheets'),
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
