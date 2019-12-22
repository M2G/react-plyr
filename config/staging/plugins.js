const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const plugins = require('../base/plugins');
const pkg = require('../../package.json');

plugins.push(
  new HtmlWebpackPlugin({
      title: pkg.name,
      inject: true,
      chunksSortMode: 'dependency',
      template: path.resolve('build/index.html'),
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }
  ),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash:8].css',
    chunkFilename: '[name].[contenthash:8].css'
  }),
  new CompressionPlugin({
    algorithm: 'gzip'
  }),
  new DotenvPlugin({
    sample: __dirname + '/../base/.env',
    path: __dirname + '/.env'
  }),
);

module.exports = plugins;
