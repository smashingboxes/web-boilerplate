var webpackConfig = require('./webpack.config');

webpackConfig.entry = {};
webpackConfig.devtool = 'inline-source-map';
webpackConfig.module.loaders = [
  {test: /\.html$/, loader: 'file', query: { name: '[name].[ext]' }},
  {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['stage-2', 'react', 'es2015'] }},
  {test: /\.s(c|a)ss$/, loader: 'style'},
  {test: /\.s(c|a)ss$/, loader: 'css?modules'},
  {test: /\.s(c|a)ss$/, loader: 'postcss'},
  {test: /\.s(c|a)ss$/, loader: 'sass', query: { outputStyle: 'expanded' }},
  {test:/\.(png|jpg|svg)$/, loader: 'url', query: { limit: 500 }}
]
webpackConfig.module.preLoaders = [
  {test: /\.jsx?$/, exclude: /(tests.webpack\.js|node_modules|\-test\.jsx?$)/, loader: 'babel-istanbul'}
];
webpackConfig.plugins = [];
webpackConfig.watch = true;

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      {pattern: 'tests.webpack.js', watched: false}
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
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
