var env = process.env.NODE_ENV || 'development';

module.exports = require('./webpack.config.' + env + '.babel.js');
