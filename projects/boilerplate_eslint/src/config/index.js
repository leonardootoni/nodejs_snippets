/**
 * Checks the application Setup and block server initialization if find problems.
 * If everething is ok, it publish a Setup Object to be used by the Application.
 *
 * @author Leonardo Otoni de Assis
 */

const path = require('path');
require('dotenv').config({ path: `${path.join(__dirname, '../', '.env')}` });
const Joi = require('@hapi/joi');

/**
 * Application Config Class.
 * Implements Singleton Pattern
 */
class Config {
  constructor() {
    if (Config.instance) {
      return Config.instance;
    }

    Config.instance = this;

    // Schema to validate external data
    this.setupSchema = Joi.object().keys({
      NODE_ENV: Joi.string().allow(['development', 'production', 'staging']).required(),
      SERVER_PORT: Joi.number().integer().min(1024).max(65535),
      SERVER_LOG: Joi.string().required(),
      APP_PATH: Joi.string().required(),
    });

    // Object containing external data. It must to be validated.
    this.envVars = {
      NODE_ENV: process.env.NODE_ENV,
      SERVER_PORT: process.env.SERVER_PORT,
      SERVER_LOG: process.env.SERVER_LOG,
      APP_PATH: path.join(__dirname, '/../'),
    };

    // Computed object. Must be used only after the Validation Process.
    this.envFlags = {
      isProduction: process.env.NODE_ENV === 'production',
    };
  }

  async validate() {
    const result = Joi.validate(this.envVars, this.setupSchema);
    return { isValid: result.error === null, message: result.error };
  }
}

const instance = new Config();

module.exports = instance;
