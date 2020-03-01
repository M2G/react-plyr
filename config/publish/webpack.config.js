const TerserPlugin            = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser       = require('postcss-safe-parser');
const path                    = require('path');
const baseConfig              = require('../base/webpack.config');
const output                  = require('./output');
const plugins                 = require('./plugins');
const rules                   = require('./rules');

module.exports = Object.assign({}, baseConfig, {
  mode: 'production',
  bail: true,
  devtool: 'source-map',
  output,
  module: {
    rules
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../../src'),
      'node_modules'
    ],
    extensions: ['*', '.js', '.jsx', '.json', '.tsx', '.ts', '.scss'],
    alias: {
      "@utils": path.join(process.cwd(), 'src', 'utils'),
      "@constants": path.join(process.cwd(), 'src', 'constants'),
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    }
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: true,
          keep_fnames: true,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: {
              inline: false,
              annotation: true,
            },
        },
      }),
    ],
  },
  plugins
});
