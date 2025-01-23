const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;

const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] ${stack || message}`;
});

const logger = createLogger({
  level: 'error',
  format: combine(timestamp(), errors({ stack: true }), customFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log' }),
  ],
});

module.exports = logger;
