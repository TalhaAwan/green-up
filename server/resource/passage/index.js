'use strict';

const Router = require('express').Router;
const controller = require('./passage.controller');
const attemptController = require('../attempt/attempt.controller');
const commentController = require('../comment/comment.controller');
// const validationSchema = require('./user.validation.schema');
// const validator = require('../../utils/request.validator.js');
const auth = require('../../auth/auth.service');

const router = new Router();

router.get('/',  controller.index);
// router.get('/show/:id', controller.show);
// router.delete('/:id', controller.destroy);
// router.put('/:id', controller.update);
// router.get('/create', controller.getCreateView);
// router.get('/edit/:id', controller.getEditView);
// 
router.get('/:id/comments', controller.comments);

router.delete('/:id/comments/:commentId', controller.destroyComment);
router.get('/:slug', controller.show);
// router.post('/', controller.create);

router.post('/:id/attempts', attemptController.create);
router.post('/:id/comments', commentController.create);







module.exports = router;
