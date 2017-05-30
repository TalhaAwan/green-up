'use strict';

const path = require('path');

module.exports = function(app) {
  // Insert routes below
  // app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));



  app.use('/attempts', require('./resource/attempt'));
  app.use('/passages', require('./resource/passage'));
  app.use('/users', require('./resource/user'));
  app.use('/admin/passages', require('./resource/passage/admin'));


  app.get('/favicon.ico', function(req, res) {
  	res.status(404);
  });
  app.use('/', require('./resource/passage'));
  

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  .get(function(req, res){
    console.log("from here");
    res.status(404); 
  });







}
