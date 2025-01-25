require('express-async-errors');
const logger = require('./logger');
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   logger.info(`Server started on port ${PORT}`);
// });

module.exports = app;
