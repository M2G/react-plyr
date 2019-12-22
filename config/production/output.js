const path = require('path');
const output = require('../base/output');

output.path = path.resolve(process.cwd(), 'build');
output.filename = '[name].[contenthash:8].js';
output.chunkFilename = '[name].[contenthash:8].chunk.js';

module.exports = output;
