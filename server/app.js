/**
 * Main application file
 */

 'use strict';
 const http = require('http');
 const cluster = require('cluster');

 const express = require('express');
 // const mongoose = require('mongoose');
 // mongoose.Promise = require('bluebird');
 const config = require('./config/environment');

// Connect to MongoDB
// mongoose.connect(config.mongo.uri, config.mongo.options);
// mongoose.connection.on('error', function(err) {
// 	console.error('MongoDB connection error: '+ err);
//   process.exit(-1); // eslint-disable-line no-process-exit
// });

// Populate databases with sample data
if(config.seedDB) {
	require('./config/seed');
}

// Setup server
const  app = express();
const  server = http.createServer(app);

require('./config/express')(app);
require('./routes')(app);

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		status: err.status
	});
});

// Start server
function startServer() {
	app.angularFullstack = server.listen(config.port, config.ip, function() {
		console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
	});
}

setImmediate(startServer);

// Expose app
module.exports = app;
