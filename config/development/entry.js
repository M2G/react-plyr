const entry = require('../base/entry');

entry.push(
  require.resolve('webpack-hot-middleware/client'),
);

module.exports = plugins;
