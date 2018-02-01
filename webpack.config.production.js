const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const webpack = require('webpack');
const config = require('./webpack.config.base');

config.bail = true;
config.profile = false;
config.output.filename = '[name].[chunkhash].js';

config.module.rules = config.module.rules.concat([
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            minimize: true
          }
        },
        'postcss-loader'
      ]
    })
  }
]);

config.plugins = config.plugins.concat([
  new webpack.LoaderOptionsPlugin({
    debug: true
  }),
  new ExtractTextPlugin('styles.[contenthash].css'),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks(module) {
      return module.context && module.context.indexOf('node_modules') !== -1;
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
  new InlineManifestWebpackPlugin({ name: 'webpackManifest' }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: true,
    output: {
      comments: false
    }
  })
]);

module.exports = config;
