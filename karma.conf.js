import webpackConfig from './webpack.config.babel';

webpackConfig.entry = {};
webpackConfig.devtool = 'inline-source-map';
webpackConfig.module.preLoaders.unshift({
  test: /\.jsx?$/,
  exclude: /(node_modules|\-spec\.jsx?$)/,
  loader: 'isparta'
});
webpackConfig.plugins = [];
webpackConfig.eslint.rules = {
  'react/react-in-jsx-scope': 0
};
webpackConfig.eslint.globals = ['expect'];
webpackConfig.watch = true;

module.exports = (config) => {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],
    files: [
      'node_modules/react/dist/react.js',
      {pattern: 'src/**/*-spec.jsx', watched: false}
    ],
    preprocessors: {
      'src/**/*': ['webpack']
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
        type: 'html',
        dir: 'coverage/'
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
      stats: 'errors-only'
    },
    autoWatch: true,
    singleRun: false
  });
};
