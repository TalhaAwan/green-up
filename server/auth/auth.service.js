'use strict';
const config = require( '../config/environment')
const jwt = require( 'jsonwebtoken')
const expressJwt = require( 'express-jwt')
const compose = require( 'composable-middleware')
const User = require( '../resource/user/user.model')

var validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */

 function isAuthenticated(){


  return compose()
    .use(function(req, res, next) {
            if(req.user){
              next();
              return null;
            }
            else{
              return res.redirect('/users/signin');
            }
          })
      
      }
      module.exports.isAuthenticated = isAuthenticated;

/**
 * Checks if the user role meets the minimum requirements of the route
 */
 module.exports.hasRole = function(roleRequired) {
  if(!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
  .use(isAuthenticated())
  .use(function meetsRequirements(req, res, next) {

    console.log("In Authorization")
    if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
      return next();
    } else {
      return res.redirect('/users/signin');
    }
  });
}

/**
 * Returns a jwt token signed by the app secret
 */
 module.exports.signToken = function(id, role) {
  return jwt.sign({ _id: id, role: role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
 module.exports.setTokenCookie = function(req, res) {
  if(!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  res.redirect('/');
}
