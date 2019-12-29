const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;
const cssModuleRegex = /\.module\.css$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// --- Full control mode ---
module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: {
          parser: 'typescript',
          prettierConfig: {
            printWidth: 100,
            singleQuote: true
          }
        }
      }
    ],
    enforce: 'pre'
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve('../'),
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
        }
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          tsconfigPath: path.resolve('tsconfig.json')
        }
      }
    ]
  });

  config.module.rules.push({
    test: cssRegex,
    exclude: [/node_modules/, cssModuleRegex],
    use: [
      {
        loader: require.resolve('style-loader'),
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          sourceMap: false
        },
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
          sourceMap: false,
        },
      },
    ],
    sideEffects: false,
  });

  config.module.rules.push({
    test: sassRegex,
    include: /node_modules/,
    exclude: sassModuleRegex,
    use: [
      {
        loader: require.resolve('style-loader'),
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 2,
          sourceMap: false,
        },
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
          sourceMap: false,
        },
      },
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: false,
        },
      },
      {
        loader: require.resolve('sass-loader'),
        options: {
          sourceMap: false,
        },
      },
    ],
    sideEffects: true,
  });

  config.module.rules.push({
    test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: './fonts',
      }
    }]
  });

  config.plugins.push(
    new HardSourceWebpackPlugin([
      {
        // HardSource works with mini-css-extract-plugin but due to how
        // mini-css emits assets, assets are not emitted on repeated builds with
        // mini-css and hard-source together. Ignoring the mini-css loader
        // modules, but not the other css loader modules, excludes the modules
        // that mini-css needs rebuilt to output assets every time.
        test: /mini-css-extract-plugin[\\/]dist[\\/]loader/
      }
    ])
  );

  config.resolve.alias = {
    src: '../src',
    stories: '../stories',
  };
  config.resolve.extensions.push(".ts", ".tsx");
  config.plugins.push(new TSDocgenPlugin());
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  return config;
};
