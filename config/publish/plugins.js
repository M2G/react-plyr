const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'react-plyr.css'
  }),
];

module.exports = plugins;
