'use strict';


const async = require ('async');
const moment = require('moment');
const Passage = require ( './passage.model').model;
const Attempt = require ( '../attempt/attempt.model').model;
const Comment = require ( '../comment/comment.model').model;
const config = require ( '../../config/environment');
const Controller = {};

/**
 * Get list of users
 * restriction: 'admin'
 */
 Controller.index = function (req, res) {

    console.log("here in passage")
    Passage.findActive(function(err, passages){
        if(err){
            res.status(500)
        }
        else{
            res.render('passage/index', {
                passages: passages
            });

        }
    })
};


Controller.getCreateView = function(req, res){
    res.render('passage/admin/create')
}


Controller.getEditView = function(req, res){
   Passage.findOne({_id: req.params.id}, function(err, passage){
    if(err){
        res.status(500).json(err);
    }
    else{
        res.render('passage/admin/edit', {
            passage: passage
        });
    }
})
}

/**
 * Creates a new user
 */
 Controller.create = function (req, res) {
    Passage.create(req.body, function(err, result){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.redirect('/passages');
        }
    })
};


Controller.update = function (req, res) {
    Passage.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.redirect('/passages');
        }
    })
};

/**
 * Get a single user
 */
 Controller.show = function (req, res) {
    Passage.findOne({slug: req.params.slug}, function(err, passage){
        if(err){
            res.status(500).json(err);
        }
        else{
           Comment.find({passage: passage._id}, function(err, comments){
            if(err){
                callback(err);
            }
            else{
              res.render('passage/show', {
                passage: passage,
                comments: comments,
                moment: moment
            })
          }

      })
           .populate("user")
           .limit(10)
           .sort({ 'createdAt': 1 })


       }
   })
};


Controller.comments = function (req, res) {
    console.log(req.query)
    console.log({passage: req.params.id, _id: { $gt: req.query.commentId }})
    Comment.find({passage: req.params.id, _id: { $gt: req.query.commentId }}, function(err, comments){
        if(err){
            res.status(500).json(err);
        }
        else if(!comments || !comments.length){
            res.json(null);
        }
        else{
            res.render('passage/component/passage/comment', {
                // passage: {
                //     _id: req.params.id,
                    comments: comments,
                // },
                moment: moment
            })
        }
    })
    .populate("user")
    .limit(20)
    .sort({ 'createdAt': 1 })

}

Controller.destroyComment = function (req, res) {
    Passage.findOneAndUpdate({ _id: req.params.id}, { $pull: { comments: req.params.commentId }}, { 'new': true, validateBeforeSave: false}, function(err){
        if(err){
            res.status(500).json(err);
        }
        else{
            Comment.findByIdAndRemove(req.params.commentId, function(err){
                if(err){
                    res.status(500).json(err);
                }
                else{
                    res.json(true);
                }
            })

        }
    });

};


/**
 * Deletes a user
 * restriction: 'admin'
 */
 Controller.destroy = function (req, res) {
    Passage.destroy(req.params.id, function(err){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.redirect("/passages")
        }
    });


};


module.exports = Controller;
