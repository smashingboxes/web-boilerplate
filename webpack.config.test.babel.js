import webpack from 'webpack';
import config from './webpack.config.development.babel';

process.env.BABEL_ENV = 'test';

export default config;
