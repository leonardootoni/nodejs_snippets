#!/usr/bin/env node

const express = require('express');

const appConfig = require('../config/index');
const { serverLogger } = require('../config/logger');
const appLoader = require('../config/loaders/index');

const shutDownServer = async () => {
  serverLogger.fatal('Server halted.');
  process.exit(1);
};

const startServer = async () => {
  serverLogger.info(`Starting Application on ${appConfig.envVars.NODE_ENV} environment...`);

  const config = await appConfig.validate();
  if (!config.isValid) {
    serverLogger.fatal(config.message);
    shutDownServer();
  }

  const app = express();

  try {
    await appLoader(app);
  } catch (error) {
    serverLogger.fatal(error);
    shutDownServer();
  }

  app.listen(process.env.SERVER_PORT, (err) => {
    if (err) {
      serverLogger.error(err);
      shutDownServer();
    }
    serverLogger.info(`Application Listening on Port ${process.env.SERVER_PORT}`);
  });

  // Catch all unhandled Promissies Rejection.
  process.on('unhandledRejection', (error, promise) => {
    serverLogger.error(`Unhandled Promise Rejection: ${promise}`);
    serverLogger.error(error);
  });

  // Protects the application against an Uncaught Exception.
  process.on('uncaughtException', (error) => {
    serverLogger.error(`Uncaught Excpetion: ${error.message}`);
    serverLogger.error(error.stack);
  });
};

startServer();

// const http = require('http');
// const app = require('../app');
// const appConstants = require('../config/app-constants');


// /** Create HTTP server. */
// const server = http.createServer(app);
// /** Get port from environment and store in Express. */
// const port = appConstants.SERVER_PORT;

// /**
//  * Event listener for HTTP server "error" event.
//  * @param {object} error - Error description
//  */
// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
//   bind.substring(1, 2); // dummy

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       // logger.fatal(`${bind} requires elevated privileges`);
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       // logger.fatal(`${bind} is already in use`);
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// /** Event listener for HTTP server "listening" event. */
// function onListening() {
//   const addr = server.address();
//   const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
//   bind.substring(1, 2); // dummy
//   // logger.info('Server started...');
//   // logger.info(`Listening on ${server.address().address} ${bind}`);
// }

// /** Listen on provided port, on all network interfaces. */
// app.set('port', port);
// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);
// // Prevents the program from closing instantly
// process.stdin.resume();
