import express from 'express';
import log4js from 'log4js';
import routes from './routes/routes';

class App {
  public express: express.Application;

  public logger: log4js.Logger;

  public constructor() {
    this.express = express();
    this.logger = log4js.getLogger();

    this.middlewares();
    this.routes();
    this.configLogger();
  }

  private middlewares(): void {
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use(routes);
  }

  /**
   * Define a default looger.
   * It must to be studied further. https://log4js-node.github.io/log4js-node/layouts.html
   * Look for espress and log4js
   */
  private configLogger(): void {
    this.logger.level = 'debug';
    log4js.configure({
      appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
      categories: { default: { appenders: ['cheese'], level: 'debug' } },
    });
  }
}

export default new App();
