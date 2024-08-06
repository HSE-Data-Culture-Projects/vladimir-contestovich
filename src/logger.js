const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => {
      if (info instanceof Error) {
        return `${info.timestamp} ${info.level}: ${info.message}\n${info.stack}`;
      }
      return `${info.timestamp} ${info.level}: ${info.message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

module.exports = logger;
