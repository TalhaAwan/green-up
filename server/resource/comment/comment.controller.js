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
    var comment = {
        text: req.body.text,
        page: req.params.id,
        guestUser: {
            name: req.body.name
        },
        rtl : req.body.rtl
    };
    !req.body.name? delete comment["guestUser"].name : null;

    if(req.body.essential){
      return res.render('page/component/page/comment', {
        comments: [Comment.getPloy(comment)],
        moment: moment
    })
   }

   Page.count({_id: req.params.id, deleted: false}, function(err, pageCount){
    if(err){
        res.status(500).json();
    }
    else if(!pageCount){
        res.status(400).json();
    }
    else{
        Comment.create(comment, function(err, comment){
            if(err){
                res.status(500).json();
            }
            else{
                res.render('page/component/page/comment', {
                    comments: [comment],
                    moment: moment
                })
            }
        });
    }
});






};

module.exports = Controller;
