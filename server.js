/*
 * Module dependencies
 */

var authorization = require('./server/boot/middleware/authorization');
var config = require('config');
var express = require('express');
var passport = require('passport');
var winston = require('winston');

/*
 * Initialize the server
 */

var configureWinstonLogs = require('./server/boot/winston');
var configurePassport = require('./server/boot/passport');
var configureExpress = require('./server/boot/express');
var configureRoutes = require('./server/boot/routes');

// Winston logging
var logger = configureWinstonLogs(winston, config);

// Passport authentication
configurePassport(passport, config);

// Express web server
var app = express();
configureExpress(app, passport, logger, config);

// Express routes
configureRoutes(app, passport, logger, authorization);

// Bind to http port and start serving!
var port = process.env.port || config.serverPort || 80;
app.listen(port);
