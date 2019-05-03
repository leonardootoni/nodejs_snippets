const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const indexRouter = require('../../routes/index');
const usersRouter = require('../../routes/users');
const { logger } = require('../logger');

const appConfig = require('../index');

module.exports = async (app) => {
  // View Engine Setup
  app.set('views', path.join(appConfig.envVars.APP_PATH, 'views'));
  app.set('view engine', 'ejs');

  // General middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(appConfig.envVars.APP_PATH, 'public')));

  // Routes Definition
  app.use('/', indexRouter);
  app.use('/users', usersRouter);

  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res) => {
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  logger.debug('Express Module Loaded.');

  return app;
};
