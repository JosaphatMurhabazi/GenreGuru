const logger = require('../logger');
const config = require('config');

module.exports = function (err, req, res, next) {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: config.get('node_env') === 'production' ? null : err.stack,
  });

  logger.error(err);
};
