'use strict';

const express = require( 'express')
const passport = require( 'passport')
const signToken = require( '../auth.service').signToken;

const validationSchema = require('../auth.validaton.schema');
const validator = require('../../utils/request.validator.js');

var router = express.Router();

router.post('/', validator.body(validationSchema.localSignIn), function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if(error) {
      return res.status(401).json(error);
    }
    if(!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }
    req.login(user, function(err) {
      if (err) {
        return res.status(500).json(error);
      } else {
        console.log("1")
        if(user.role == "admin"){
          console.log("2")
          res.redirect('/admin/pages');
        }
        else{
          console.log("3")
          res.redirect('/pages');
        }
      }
    });


  })(req, res, next);
});



router.get('/signout', function(req, res){
  req.logout();
  res.redirect('/users/signin');
})

module.exports = router;
