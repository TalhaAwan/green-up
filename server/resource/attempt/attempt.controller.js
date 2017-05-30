'use strict';

const moment = require('moment');

const config = require ( '../../config/environment');
const Passage = require ( '../passage/passage.model').model;
const Attempt = require ( './attempt.model').model;
const Comment = require ( '../comment/comment.model').model;
const Controller = {};

/**
 * Creates a new attempt
 */
 Controller.create = function (req, res) {
    var attempt = {
        translation: req.body.translation,
        passage: req.params.id,
        user: req.user._id
    };

    // Attempt.createIfNotFound(attempt, function(err, result){
    //     if(err){
    //         if(err == 403){
    //             res.status(403).json("You have already attempted on this passage");
    //         }
    //         else{
    //             res.status(500).json(err);
    //         }
    //     }
    //     else{
    //         res.redirect(req.get('referer'));
    //     }
    // })
    // 
    // 
    Attempt.create(attempt, function(err, result){
        if(err){
            if(err == 403){
                res.status(403).json("You have already attempted on this passage");
            }
            else{
                res.status(500).json(err);
            }
        }
        else{
            res.redirect(req.get('referer'));
        }
    })
};


Controller.comments = function (req, res) {
    Comment.find({attempt: req.params.id, _id: { $gt: req.query.commentId }}, function(err, comments){
        if(err){
            res.status(500).json(err);
        }
        else if(!comments || !comments.length){
            res.json(null);
        }
        else{   
         
            res.render('passage/component/attempt/comment', {
                attempt: {
                    comments: comments
                },
                moment: moment
            })
        }
    })
    .populate("user")
    .limit(10)
    .sort({ 'createdAt': 1 })



}

module.exports = Controller;
