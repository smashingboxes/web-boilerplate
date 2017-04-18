var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  entry: ['./src/index.jsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: { presets: ['stage-2', 'react', 'es2015'] }
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader?importLoaders=1',
        'postcss-loader'
      ]
    }, {
      test: /\.(gif|png|jpg|svg|woff|woff2|ttf|eot)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 25000
        }
      }
    }]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
