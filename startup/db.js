const mongoose = require('mongoose');
require('dotenv').config();
const config = require('config');
const logger = require('../logger');

const connectDB = async () => {
  try {
    await mongoose.connect(config.get('mongo_uri'));
    logger.info('Connected to MongoDB...');
  } catch (e) {
    console.error('Could not connect to MongoDB...', e);
  }
};

module.exports = connectDB;
