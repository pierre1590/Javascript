// webpack.config.js
const Dotenv = require('dotenv-webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  'mode':'development',
  
  plugins: [
    new Dotenv(),
    [new HtmlWebpackPlugin()]
  ],

  entry: './public/js/app.js',
  output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js'
  }
  
};