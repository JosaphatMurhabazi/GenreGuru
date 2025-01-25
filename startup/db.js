const mongoose = require('mongoose');
const config = require('config');
const logger = require('../logger');

module.exports = async function () {
  const db = config.get('db');
  await mongoose.connect(db);
  logger.info(`Connected to MongoDB...${config.get('db')}`);
};
