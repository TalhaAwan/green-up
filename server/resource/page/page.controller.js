'use strict';


const async = require ('async');
const moment = require('moment');
const Page = require ( './page.model').model;
const Comment = require ( '../comment/comment.model').model;
const config = require ( '../../config/environment');
const Controller = {};

/**
 * Get list of users
 * restriction: 'admin'
 */
 Controller.index = function (req, res) {

    console.log("here in page")
    Page.findActive(function(err, pages){
        if(err){
            res.status(500)
        }
        else{
            res.render('page/index', {
                pages: pages
            });

        }
    })
};


Controller.getCreateView = function(req, res){
    res.render('page/admin/create')
}


Controller.getEditView = function(req, res){
   Page.findOne({_id: req.params.id}, function(err, page){
    if(err){
        res.status(500).json(err);
    }
    else{
        res.render('page/admin/edit', {
            page: page
        });
    }
})
}

/**
 * Creates a new user
 */
 Controller.create = function (req, res) {
    Page.create(req.body, function(err, result){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.redirect('/pages');
        }
    })
};


Controller.update = function (req, res) {

    Page.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.redirect('/pages');
        }
    })
};

/**
 * Get a single user
 */
 Controller.show = function (req, res, next) {
    Page.findOne({slug: req.params.slug}, function(err, page){
        if(err){
            var err = new Error('Oops! Something Went Wrong');
            err.status = 500;
            next(err);
        }
        else if(!page){
            var err = new Error('Oops! The Page Cannot Be Found');
            err.status = 404;
            next(err);
        }
        else{
           Comment.find({page: page._id}, function(err, comments){
            if(err){e
                callback(err);
            }
            else{
              res.render('page/show', {
                page: page,
                comments: comments,
                moment: moment
            })
          }

      })

           .limit(50)
           .sort({ 'createdAt': 1 })


       }
   })
};


Controller.comments = function (req, res) {
    Comment.find({page: req.params.id, _id: { $gt: req.query.commentId }}, function(err, comments){
        if(err){
            console.log(err)
            res.status(500).json(err);
        }
        else if(!comments || !comments.length){
            res.json(null);
        }
        else{
            res.render('page/component/page/comment', {
                // page: {
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
    Page.findOneAndUpdate({ _id: req.params.id}, { $pull: { comments: req.params.commentId }}, { 'new': true, validateBeforeSave: false}, function(err){
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
    Page.destroy(req.params.id, function(err){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.redirect("/pages")
        }
    });


};


module.exports = Controller;
