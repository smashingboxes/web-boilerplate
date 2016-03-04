import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

// PostCSS plugins
import autoprefixer from 'autoprefixer';
import lost from 'lost';

import eslintFriendlyFormatter from 'eslint-friendly-formatter';

export default {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: ['./src/index.jsx'],
  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/}
    ],
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['stage-0', 'react', 'es2015'] }},
      {test: /\.s(c|a)ss$/, loader: 'style'},
      {test: /\.s(c|a)ss$/, loader: 'css'},
      {test: /\.s(c|a)ss$/, loader: 'postcss'},
      {test: /\.s(c|a)ss$/, loader: 'sass', query: { outputStyle: 'expanded' }},
      {test: /\.(png|jpg|svg|woff|woff2|ttf|eot)$/, loader: 'url', query: { limit: 25000 }}
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  eslint: {
    formatter: eslintFriendlyFormatter
  },
  postcss: () => [lost, autoprefixer]
};
