/**
 * Application Modules Loader
 * All Application modules must be invoked from this entry point.
 * @author: Leonardo Otoni de Assis
 */
const expressLoader = require('./expressLoader');
const { logger } = require('../logger');

module.exports = async (expressApp) => {
  logger.debug('Loading Application Modules...');
  await expressLoader(expressApp);
};
