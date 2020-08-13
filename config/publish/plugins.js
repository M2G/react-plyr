const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'toolkit.css'
  }),
];

module.exports = plugins;
