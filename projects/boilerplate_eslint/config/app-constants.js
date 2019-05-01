/**
 * General Application Constants
 * @author: Leonardo Otoni de Assis
 */
const appConstants = Object.freeze({
  SERVER_PORT: 3333,
  PRODUCTION_LOG_FILE: 'application.log',
  // Default environment constants
  ENV_DEVELOPMENT: 'development',
  ENV_PRODUCTION: 'production',

  // Key reference to a log4js.logger into express app object
  LOGGER: 'logger',
});

module.exports = appConstants;
