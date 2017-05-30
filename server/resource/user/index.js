'use strict';

const Router = require('express').Router;
const controller = require('./user.controller');
const validationSchema = require('./user.validation.schema');
const validator = require('../../utils/request.validator.js');
const auth = require('../../auth/auth.service');

const router = new Router();

// router.get('/', auth.hasRole('admin'), controller.index);
// router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', controller.me);
// router.put('/:id/password', auth.isAuthenticated(), validator.body(validationSchema.changePassword), controller.changePassword);
// router.get('/:id', auth.isAuthenticated(), controller.show);

router.get('/signup', controller.getSignupView);
router.get('/signin', controller.getSigninView);
router.post('/', controller.signup);

module.exports = router;
