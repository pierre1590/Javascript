const Dotenv = require('dotenv-webpack').config();

module.exports = {
    plugins: [
        new Dotenv()
    ]
}