var webpack = require('webpack');
var config = require('./webpack.config.base');

config.bail = true;
config.profile = false;
config.devtool = 'source-map';

config.plugins = config.plugins.concat([
  new webpack.LoaderOptionsPlugin({
    debug: true
  }),
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
