import webpackConfig from './webpack.config.babel';

webpackConfig.entry = {};
webpackConfig.devtool = 'inline-source-map';
webpackConfig.module.loaders = [
  {test: /\.html$/, loader: 'file', query: { name: '[name].[ext]' }},
  {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['stage-0', 'react', 'es2015'] }},
  {test: /\.s(c|a)ss$/, loader: 'style'},
  {test: /\.s(c|a)ss$/, loader: 'css?modules'},
  {test: /\.s(c|a)ss$/, loader: 'postcss'},
  {test: /\.s(c|a)ss$/, loader: 'sass', query: { outputStyle: 'expanded' }},
  {test:/\.(png|jpg|svg)$/, loader: 'url', query: { limit: 500 }}
];
webpackConfig.module.preLoaders.unshift({
  test: /\.jsx?$/,
  exclude: /(node_modules|\-spec\.jsx?$)/,
  loader: 'isparta'
});
webpackConfig.plugins = [];
webpackConfig.watch = true;

module.exports = (config) => {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    files: [
      'node_modules/react/dist/react.js',
      {pattern: 'src/**/*-test.jsx', watched: false},
      {pattern: 'src/**/*-test.js', watched: false}
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
