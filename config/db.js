const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB...');
  } catch (e) {
    console.error('Could not connect to MongoDB...', e);
  }
};

module.exports = connectDB;
