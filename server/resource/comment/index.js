'use strict';

const Router = require('express').Router;
const controller = require('./comment.controller');
const auth = require('../../auth/auth.service');
const router = new Router();

module.exports = router;
