const mongoose = require('mongoose');
const config = require('config');
const logger = require('../logger');

module.exports = async function () {
  await mongoose.connect(config.get('mongo_uri'));
  logger.info('Connected to MongoDB...');
};
