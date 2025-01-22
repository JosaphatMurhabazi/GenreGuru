const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const connectDB = require('./config/db');
const express = require('express');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const home = require('./routes/home');
require('dotenv').config();
const config = require('config');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

connectDB();

const app = express();
const PORT = config.get('port') || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', home);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
