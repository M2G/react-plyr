const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const plugins = require('../base/plugins');
const pkg = require('../../package.json');

plugins.push(
  new HtmlWebpackPlugin({
      title: pkg.name,
      inject: true,
      template: path.resolve('public/index.ejs'),
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
  new DotenvPlugin({
    sample: __dirname + '/../base/.env',
    path: __dirname + '/.env'
  }),
);

module.exports = plugins;
