'use strict';

const async = require('async');
const moment = require('moment');
const Page = require ( '../page/page.model').model;
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
        page: req.params.id
    };


    Comment.create(comment, function(err, comment){
        if(err){
            res.status(500).json(err);
        }
        else{
            console.log(comment)
            res.render('page/component/page/comment', {
                // page: {
                //     _id: req.params.id,
                    comments: [comment],
                // },
                moment: moment
            })
        }
    });





};

module.exports = Controller;
