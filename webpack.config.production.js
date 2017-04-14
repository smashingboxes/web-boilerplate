var webpack = require('webpack');
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
var config = require('./webpack.config.base');

config.bail = true;
config.profile = false;
config.devtool = 'source-map';
config.output.filename = '[name].[chunkhash].js';

config.plugins = config.plugins.concat([
  new webpack.LoaderOptionsPlugin({
    debug: true
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: (module) => {
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
