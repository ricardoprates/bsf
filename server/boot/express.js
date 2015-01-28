/*
 * Module dependencies
 */

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
var path = require('path');
var session = require('express-session');

module.exports = function (app, passport, logger, config)
{
    var root = path.normalize(__dirname + '/../..');

    app.set('view engine', 'ejs');
    app.set('views', root + '/server/views');
    app.use(express.static(root + '/public'));

    // put morgan before static if you want to see everything logged, including GETs for images, html, etc.
    app.use(morgan('tiny', {
        stream: {
            write: function (message, encoding)
            {
                logger.info(message);
            }
        }
    }));

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.use(session(
        {
            secret: config.sessionSecret || '53CR3T P455W0RD',
            resave: true,
            saveUninitialized: true
        }
    ));

    app.use(passport.initialize());
    app.use(passport.session());

    if (process.env.NODE_ENV !== 'production')
    {
        app.use(errorHandler());
    }
};
