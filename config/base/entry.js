const path = require('path');

const entry = [
  path.resolve('src', 'index.tsx')
];

if (process.env.NODE_ENV === 'development') {
  entry.client = 'webpack-hot-middleware/client';
}

module.exports = entry;
