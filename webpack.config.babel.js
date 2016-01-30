import webpack from 'webpack';

// PostCSS plugins
import autoprefixer from 'autoprefixer';
import lost from 'lost';

import eslintFriendlyFormatter from 'eslint-friendly-formatter';

export default {
  devtool: 'source-map',
  devServer: {
    colors: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    stats: 'minimal'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: {
    jsx: [
      './src/index.jsx'
    ],
    html: './src/index.html'
  },
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/}
    ],
    loaders: [
      {test: /\.html$/, loader: 'file', query: { name: '[name].[ext]' }},
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['stage-0', 'react', 'es2015'] }},
      {test: /\.s(c|a)ss$/, loader: 'postcss', query: { outputStyle: 'expanded' }},
      {test: /\.s(c|a)ss$/, loader: 'sass'},
      {test: /\.s(c|a)ss$/, loader: 'css'},
      {test: /\.s(c|a)ss$/, loader: 'style'},
      {test:/\.(png|jpg|svg)$/, loader: 'url', query: { limit: 25000 }}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  eslint: {
    formatter: eslintFriendlyFormatter
  },
  postcss: () => [lost, autoprefixer]
};
