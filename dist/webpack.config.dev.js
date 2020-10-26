"use strict";

// webpack.config.js
var Dotenv = require('dotenv-webpack');

var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  'mode': 'development',
  plugins: [new Dotenv(), [new HtmlWebpackPlugin()]],
  entry: './public/js/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  }
};