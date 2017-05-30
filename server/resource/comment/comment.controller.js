'use strict';

const async = require('async');
const moment = require('moment');
const Passage = require ( '../passage/passage.model').model;
const Attempt = require ( '../attempt/attempt.model').model;
const Comment = require ( './comment.model').model;
const config = require ( '../../config/environment');
const Controller = {};

/**
 * Creates a new comment
 */
 Controller.create = function (req, res) {
    console.log("In Create", req.body)
    var comment = {
        text: req.body.text,
        guestUser: {
            name: req.body.name,
            email: req.body.email
        },
        passage: req.params.id
    };


    Comment.create(comment, function(err, comment){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.render('passage/component/passage/comment', {
                // passage: {
                //     _id: req.params.id,
                    comments: [comment],
                // },
                moment: moment
            })
        }
    });





};

module.exports = Controller;
