const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const rules = require('../base/rules');

const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;
const cssModuleRegex = /\.module\.css$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const cssLoaderRule = {
  test: cssRegex,
  include: /node_modules/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: { publicPath: '../../../' },
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        sourceMap: true
      }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          autoprefixer({
            browsers: [
              "> 1%",
              "last 2 versions"
            ]
          })
        ],
        sourceMap: true,
      },
    }],
  sideEffects: true
};

const cssModuleLoaderRule = {
  test: cssModuleRegex,
  include: /node_modules/,
  exclude: cssRegex,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: { publicPath: '../../../' },
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        sourceMap: true,
        modules: true
      }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          autoprefixer({
            browsers: [
              "> 1%",
              "last 2 versions"
            ]
          })
        ],
        sourceMap: true,
      },
    }],
  sideEffects: true
};

const sassLoaderRule = {
  test: sassRegex,
  include: /node_modules/,
  exclude: sassModuleRegex,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: { publicPath: '../../../' },
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 2,
        sourceMap: true
      }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
        sourceMap: true,
      },
    },
    {
      loader: require.resolve('resolve-url-loader'),
      options: {
        sourceMap: true,
      },
    },
    {
      loader: require.resolve('sass-loader'),
      options: {
        sourceMap: true,
      },
    }],
  sideEffects: true,
};

const sassModuleLoaderRule = {
  test: sassRegex,
  include: /node_modules/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: { publicPath: '../../../' },
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 2,
        sourceMap: true,
        modules: true
      }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
        sourceMap: true,
      },
    },
    {
      loader: require.resolve('resolve-url-loader'),
      options: {
        sourceMap: true,
      },
    },
    {
      loader: require.resolve('sass-loader'),
      options: {
        sourceMap: true,
      },
    }],
  sideEffects: true,
};

rules.push(
  cssLoaderRule,
  cssModuleLoaderRule,
  sassLoaderRule,
  sassModuleLoaderRule
);

module.exports = rules;
