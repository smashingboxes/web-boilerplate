var webpack = require('webpack');
var config = require('./webpack.config.base');

config.devServer = {
  historyApiFallback: {
    rewrites: [
      { from: /^\/$/, to: 'index.html' }
    ]
  },
  hot: true,
  inline: true,
  host: '0.0.0.0'
};
config.devtool = 'inline-source-map';

config.entry.unshift('webpack/hot/only-dev-server');
config.entry.unshift('webpack-dev-server/client?http://localhost:8080');

config.module.rules = config.module.rules.concat([{
  enforce: 'pre',
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: 'eslint-loader'
}]);

config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
config.plugins.unshift(new webpack.LoaderOptionsPlugin({
  options: {
    eslint: {
      emitWarning: true,
      formatter: require('eslint-friendly-formatter')
    }
  }
}));

module.exports = config;
