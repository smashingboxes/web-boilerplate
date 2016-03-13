module.exports = process.env.NODE_ENV === 'production' ? require('./webpack.config.production.babel.js') : require('./webpack.config.development.babel.js');
