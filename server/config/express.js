/**
 * Express configuration
 */

 'use strict';

 const express =   require('express');
// const favicon =   require('serve-favicon');
const morgan =   require('morgan');
const bodyParser =   require('body-parser');
const expressValidator = require('express-validator');
const methodOverride =   require('method-override');
const cookieParser =   require('cookie-parser');
const cors =   require('cors');
const errorHandler =   require('errorhandler');
const ejs = require('ejs');
const path =   require( 'path');
const lusca =   require( 'lusca');
const config =   require( './environment');
const passport  =   require( 'passport');
const session =   require( 'express-session');
const connectMongo =   require( 'connect-mongo');
const mongoose =   require( 'mongoose');
const flash    = require('connect-flash');
var MongoStore = connectMongo(session);

module.exports = function(app) {
    var env = app.get('env');
    app.use( express.static( "public" ) );
    app.use(morgan('dev'));

    ejs.delimiter = '?';
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(expressValidator());
    app.use(methodOverride());
    app.use(methodOverride('_method'))
    app.use(cookieParser());



    // Persist sessions with MongoStore / sequelizeStore
    // We need to enable sessions for passport-twitter because it's an
    // oauth 1.0 strategy, and Lusca depends on sessions
    // app.use(session({
    //     secret: config.secrets.session,
    //     saveUninitialized: true,
    //     resave: false,
    //     store: new MongoStore({
    //         mongooseConnection: mongoose.connection,
    //         db: config.mongo.uri
    //     })
    // }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());


    app.use(function (req, res, next) {
      res.locals.login = req.isAuthenticated();
      res.locals.user = req.user
      next();
    });
    /**
     * Lusca - express server security
     * https://github.com/krakenjs/lusca
     */
    //  if(env !== 'test' && env !== 'development') {
    //     app.use(lusca({
    //         csrf: true,
    //         xframe: 'SAMEORIGIN',
    //         hsts: {
    //             maxAge: 31536000, //1 year, in seconds
    //             includeSubDomains: true,
    //             preload: true
    //         },
    //         xssProtection: true
    //     }));
    // }


    // if(env === 'development' || env === 'test') {
    //     app.use(errorHandler()); // Error handler - has to be last
    // }
    // 
    

}
