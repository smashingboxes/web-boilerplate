var webpack = require('webpack');
var config = require('./webpack.config.base');

config.devServer = {
  historyApiFallback: {
    rewrites: [
      { from: /^\/$/, to: 'index.html' }
    ]
  },
  host: '0.0.0.0',
  hot: true,
  inline: true,
  proxy: {
    '/api': {
      changeOrigin: true,
      target: 'http://localhost:3000'
    }
  }
};

config.entry.unshift('webpack/hot/only-dev-server');
config.entry.unshift('webpack-dev-server/client?http://localhost:8080');


config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

module.exports = config;
