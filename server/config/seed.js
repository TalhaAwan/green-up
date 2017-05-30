/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

 'use strict';
 const User = require ('../resource/user/user.model');
 const Comment = require ('../resource/comment/comment.model').model;
 const async = require('async');

 // Comment.create(
 // {
 // 	text: 'hello',
 // 	page: "592dc5833b11fa10a2cd3da4"}
 // 	, function(err, comment){
 // 		console.log(err)
 // 		console.log(comment)
 // 	})

