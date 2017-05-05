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
config.devtool = 'inline-source-map';

config.module.rules = config.module.rules.concat([
  {
    enforce: 'pre',
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: 'eslint-loader'
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader?importLoaders=1',
      'postcss-loader'
    ]
  }
]);

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
