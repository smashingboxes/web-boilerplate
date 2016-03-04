import webpack from 'webpack';
import config from './webpack.config.base.babel';

config.bail = true;
config.debug = false;
config.profile = false;
config.devtool = 'source-map';

config.plugins = config.plugins.concat([
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    }
  })
]);

export default config;
