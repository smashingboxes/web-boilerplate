var webpack = require('webpack');
var config = require('./webpack.config.base');

config.devServer = {
  historyApiFallback: {
    rewrites: [
      { from: /^\/$/, to: 'index.html' }
    ]
  },
  hot: true,
  inline: true
};

config.entry.unshift('webpack/hot/only-dev-server');
config.entry.unshift('webpack-dev-server/client?http://localhost:8080');

config.eslint = {
  emitWarning: true,
  formatter: require('eslint-friendly-formatter')
};

config.module.preLoaders = config.module.preLoaders.concat([
  { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ }
]);

config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

module.exports = config;
