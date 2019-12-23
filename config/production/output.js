const path = require('path');
const output = require('../base/output');

output.path = path.resolve(process.cwd(), 'build');
output.filename = 'static/js/[name].[contenthash:8].js';
output.chunkFilename = 'static/js/[name].[contenthash:8].chunk.js';

module.exports = output;
