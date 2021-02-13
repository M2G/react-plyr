const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const plugins = require('../base/plugins');
const paths = require('../base/paths');
const pkg = require('../../package.json');

plugins.push(
  new webpack.ProgressPlugin(),
  new CleanWebpackPlugin(),
  new CopyWebpackPlugin([{
    from: 'public/icon.png',
    to: 'static'
  }]),
  new HtmlWebpackPlugin({
    title: pkg.name,
    inject: true,
    template: paths.appHtml,
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
  }),
  new WorkboxWebpackPlugin.GenerateSW({
    clientsClaim: true,
    exclude: [/\.map$/, /asset-manifest\.json$/],
    importWorkboxFrom: 'cdn',
    navigateFallback: path.resolve('public/index.html'),
    navigateFallbackBlacklist: [
      // Exclude URLs starting with /_, as they're likely an API call
      new RegExp('^/_'),
      // Exclude any URLs whose last part seems to be a file extension
      // as they're likely a resource and not a SPA route.
      // URLs containing a "?" character won't be blacklisted as they're likely
      // a route with query params (e.g. auth callbacks).
      new RegExp('/[^/?]+\\.[^/]+$'),
    ],
  }),
  new MiniCssExtractPlugin({
    filename: 'static/css/[name].[contenthash:8].css',
    chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
  }),
  new DotenvPlugin({
    sample: __dirname + '/../base/.env',
    path: __dirname + '/.env'
  }),
);

module.exports = plugins;
