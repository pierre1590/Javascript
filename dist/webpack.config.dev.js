"use strict";

// webpack.config.js
var Dotenv = require('dotenv-webpack');

var path = require('path');

module.exports = {
  plugins: [new Dotenv()],
  entry: './public/js/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  }
};