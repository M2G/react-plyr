const path = require('path');
const pkg = require('../../package');
const output = require('../base/output');

output.path = path.resolve(process.cwd(), 'build');
output.filename = 'react-plyr.js';
output.library = pkg.name;
output.libraryTarget = 'umd';
output.publicPath = '/build/';
output.umdNamedDefine = true;

module.exports = output;
