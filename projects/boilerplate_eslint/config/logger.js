/**
 * General Application Logger Configuration
 * @author: Leonardo Otoni de Assis
 */

const log4js = require('log4js');
const appConstants = require('../config/app-constants');

const Appender = {
  DEVELOPMENT: 'default',
  PRODUCTION: 'production',
  SERVER: 'server',
};

log4js.configure({
  appenders: {
    file: {
      type: 'dateFile',
      filename: appConstants.PRODUCTION_LOG_FILE,
      keepFileExt: true,
      layout: { type: 'pattern', pattern: '[%d] [%p] %m' },
    },
    console: {
      type: 'console',
      layout: { type: 'pattern', pattern: '%[[%d] [%p]%] %m' },
    },
  },
  categories: {
    default: { appenders: ['console'], level: 'debug' },
    production: { appenders: ['file'], level: 'error' },
    server: { appenders: ['file'], level: 'info' },
  },
});

// Logger to be used only by the server file.
const processLogger = process.env.NODE_ENV === appConstants.ENV_PRODUCTION
  ? log4js.getLogger(Appender.SERVER) : log4js.getLogger();

// Application Logger
const logger = process.env.NODE_ENV === appConstants.ENV_PRODUCTION
  ? log4js.getLogger(Appender.PRODUCTION) : log4js.getLogger();

module.exports = { logger, processLogger };
