let lodash = require('lodash');

// console.log('process.env.NODE_ENV ', process.env.NODE_ENV)
// let config = lodash.merge(require('./env/' + process.env.NODE_ENV + '.js') || {});

let config = lodash.merge(require('./env/' + 'local.js') || {});

module.exports = config;