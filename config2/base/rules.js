const paths = require('./paths');

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || 10000
);

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
  include: paths.appSrc,
};

const tsLoader = {
  test: /\.(ts|tsx)$/,
  include: paths.appSrc,
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
  include: paths.appSrc,
  use: [{
    loader: require.resolve('babel-loader'),
    options: {
      cacheDirectory: true
    }
  }]
};

const filesLoaderRule = {
  test: /.(png|svg|jpe?g|gif|ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
  use: [{
    loader: require.resolve('file-loader'),
    options: {
      name(file) {
        if (process.env.NODE_ENV === 'development') {
          return '[path][name].[ext]';
        }

        return '[contenthash].[ext]';
      },
    },
  }]
};

const rules = [
  preLoader,
  jsLoaderRule,
  tsLoader,
  filesLoaderRule,
];

module.exports = rules;
