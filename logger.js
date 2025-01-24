const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors, colorize } = format;

const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] ${stack || message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp(),
    errors({ stack: true }),
    customFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log' }),
  ],
});

module.exports = logger;
