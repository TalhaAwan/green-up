'use strict';

const Router = require('express').Router;
const controller = require('./page.controller');
const commentController = require('../comment/comment.controller');
const validationSchema = require('../comment/comment.validation.schema');
const validator = require('../../utils/request.validator.js');
const auth = require('../../auth/auth.service');

const router = new Router();

router.get('/',  controller.index);
router.get('/directory',  controller.directory);
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

router.post('/:id/comments', validator.params(validationSchema.id), validator.body(validationSchema.create), commentController.create);







module.exports = router;
