var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  entry: ['./src/index.jsx'],
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [],
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['stage-2', 'react', 'es2015'] }},
      {test: /\.css$/, loader: 'style'},
      {test: /\.css$/, loader: 'css'},
      {test: /\.css$/, loader: 'postcss'},
      {test: /\.(gif|png|jpg|svg|woff|woff2|ttf|eot)$/, loader: 'url', query: { limit: 25000 }}
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new CleanWebpackPlugin('dist'),
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  postcss: function(webpack) {
    return [
      require('postcss-import')({ addDependencyTo: webpack }),
      require('postcss-apply'),
      require('postcss-nested'),
      require('precss'),
      require('postcss-assets')({
        "basePath": "src/",
        "cachebuster": true,
        "loadPaths": ["img/"],
        "relative": true
      }),
      require('postcss-cssnext'),
      require('postcss-hexrgba'),
      require('postcss-reporter')
    ];
  }
};
