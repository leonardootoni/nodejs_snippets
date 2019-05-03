/**
 * General Application Logger Configuration
 * @author: Leonardo Otoni de Assis
 */
const log4js = require('log4js');
const appConfig = require('./index');

class AppLogger {
  /**
   * @param {log4js} logger
   */
  constructor(logger) {
    if (AppLogger.instance) {
      return AppLogger.instance;
    }
    AppLogger.instance = this;

    this.appender = {
      DEVELOPMENT: 'default',
      PRODUCTION: 'production',
      SERVER: 'server',
    };

    this.logger = logger;
    this.logger.configure({
      appenders: {
        file: {
          type: 'dateFile',
          filename: appConfig.envVars.SERVER_LOG,
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
  }

  getServerLogger() {
    return appConfig.envFlags.isProduction
      ? this.logger.getLogger(this.appender.SERVER) : this.logger.getLogger();
  }

  getAppLogger() {
    return appConfig.envFlags.isProduction
      ? this.logger.getLogger(this.appender.PRODUCTION) : this.logger.getLogger();
  }
}

const instance = new AppLogger(log4js);

module.exports.logger = instance.getAppLogger();
module.exports.serverLogger = instance.getServerLogger();

// const Appender = {
//   DEVELOPMENT: 'default',
//   PRODUCTION: 'production',
//   SERVER: 'server',
// };

// log4js.configure({
//   appenders: {
//     file: {
//       type: 'dateFile',
//       filename: 'tmp/application.log',
//       keepFileExt: true,
//       layout: { type: 'pattern', pattern: '[%d] [%p] %m' },
//     },
//     console: {
//       type: 'console',
//       layout: { type: 'pattern', pattern: '%[[%d] [%p]%] %m' },
//     },
//   },
//   categories: {
//     default: { appenders: ['console'], level: 'debug' },
//     production: { appenders: ['file'], level: 'error' },
//     server: { appenders: ['file'], level: 'info' },
//   },
// });

// // Logger to be used only by the server file.
// const processLogger = process.env.NODE_ENV === Appender.PRODUCTION
//   ? log4js.getLogger(Appender.SERVER) : log4js.getLogger();

// // Application Logger
// const logger = process.env.NODE_ENV === Appender.PRODUCTION
//   ? log4js.getLogger(Appender.PRODUCTION) : log4js.getLogger();

// module.exports = { logger, processLogger };
