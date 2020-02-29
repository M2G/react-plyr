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
      "@Icon": path.join(process.cwd(), 'src', 'Icon'),
      "@Alert": path.join(process.cwd(), 'src', 'Alert'),
      "@Hint": path.join(process.cwd(), 'src', 'Hint'),
      "@Portal": path.join(process.cwd(), 'src', 'Portal'),
      "@Layout": path.join(process.cwd(), 'src', 'Layout'),
      "@Toggle": path.join(process.cwd(), 'src', 'Toggle'),
      "@Dropdown": path.join(process.cwd(), 'src', 'Dropdown'),
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
