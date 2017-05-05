var ExtractTextPlugin = require('extract-text-webpack-plugin');
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
var webpack = require('webpack');
var config = require('./webpack.config.base');

config.bail = true;
config.profile = false;
config.devtool = 'source-map';
config.output.filename = '[name].[chunkhash].js';

config.module.rules = config.module.rules.concat([
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader?importLoaders=1',
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
    minChunks: function(module) {
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
