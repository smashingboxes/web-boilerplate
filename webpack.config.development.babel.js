import webpack from 'webpack';
import config from './webpack.config.base.babel';

config.entry.unshift('webpack/hot/only-dev-server');
config.entry.unshift('webpack-dev-server/client?http://localhost:8080');

config.devServer = {
  hot: true,
  inline: true
};

config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

export default config;
