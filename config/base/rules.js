const path = require('path');

const preLoader = {
  enforce: 'pre',
  test: /\.(js|jsx|ts|tsx)$/,
  use: [
  {
    options: {
      cache: true,
      eslintPath: require.resolve('eslint'),
      resolvePluginsRelativeTo: __dirname,

    },
    loader: require.resolve('eslint-loader'),
  },
],
  include: path.resolve('src')
};

const tsLoader = {
  test: /\.(ts|tsx)$/,
  include: path.resolve('src'),
  use: [
    {
      loader: require.resolve('ts-loader'),
      options: {
        transpileOnly: true
      }
    },
  ],
};

const jsLoaderRule = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    query: {
      cacheDirectory: true
    }
  }]
};

const filesLoaderRule = {
  test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: './fonts',
    }
  }]
};

const svgImageLoaderRule = {
  test: /\.svg$/,
  use: {
    loader: 'svg-url-loader'
  }
};

const imagesLoaderRule = {
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: '[name]-[sha512:hash:base64:7].[ext]',
        publicPath: '/'
      }
    }
  ]
};

const rules = [
  preLoader,
  jsLoaderRule,
  tsLoader,
  imagesLoaderRule,
  svgImageLoaderRule,
  filesLoaderRule
];

module.exports = rules;
