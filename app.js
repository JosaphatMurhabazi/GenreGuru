require('express-async-errors');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
require('dotenv').config();
const config = require('config');
const express = require('express');
const app = express();
const PORT = config.get('port') || 3000;

require('./startup/db')();
require('./startup/routes')(app);

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
