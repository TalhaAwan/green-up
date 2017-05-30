'use strict';

const express = require ( 'express')
const passport = require ( 'passport')
const setTokenCookie = require ( '../auth.service').setTokenCookie

var router = express.Router();

router
.get('/', passport.authenticate('facebook', {
	scope: ['email', 'user_about_me'],
	failureRedirect: '/users/signup',
	session: true
}))
.get('/callback', passport.authenticate('facebook', {
	failureRedirect: '/users/signup',
	successRedirect : '/',
	session: true
}));

module.exports = router;
