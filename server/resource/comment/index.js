'use strict';

const Router = require('express').Router;
const controller = require('./comment.controller');
const auth = require('../../auth/auth.service');
const validationSchema = require('./comment.validation.schema');
const validator = require('../../utils/request.validator.js');
const router = new Router();

module.exports = router;
