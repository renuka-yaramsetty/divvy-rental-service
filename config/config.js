const _ = require('lodash');

const config = require('./config.json');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];

module.exports = _.merge(defaultConfig, environmentConfig);

