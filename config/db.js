const mongoose = require('mongoose');
require('dotenv').config();
const config = require('config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.get('mongo_uri'));
    console.log('Connected to MongoDB...');
  } catch (e) {
    console.error('Could not connect to MongoDB...', e);
  }
};

module.exports = connectDB;
