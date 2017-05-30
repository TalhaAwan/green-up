

'use strict';

const Router = require('express').Router;
const controller = require('./attempt.controller');
const attemptController = require('../attempt/attempt.controller');
const commentController = require('../comment/comment.controller');
const auth = require('../../auth/auth.service');

const router = new Router();

router.get('/:id/comments', controller.comments);
router.post('/:id/comments', function(req, res, next){
	req.isAttemptComment = true;
	return next();
}, commentController.create);

module.exports = router;
