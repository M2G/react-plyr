const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');
const plugins = require('../base/plugins');
const paths = require('../base/paths');
const pkg = require('../../package.json');

plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  }),
  new DotenvPlugin({
    sample: __dirname + '/../base/.env',
    path: __dirname + '/.env'
  }),
  new HtmlWebpackPlugin({
    title: pkg.name,
    inject: true,
    template: paths.appHtml,
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[id].css',
    ignoreOrder: false,
  }),
  new webpack.HotModuleReplacementPlugin(),
);

module.exports = plugins;
