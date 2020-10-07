// webpack.config.js
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {

  plugins: [
    new Dotenv()
  ],

  entry: './public/js/app.js',
  output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js'
  }
  
};