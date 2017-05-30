'use strict';


const Passage = require ( '../passage.model').model;
const config = require ( '../../../config/environment');
const Controller = {};

/**
 * Get list of users
 * restriction: 'admin'
 */
 Controller.index = function (req, res) {

    Passage.findActive(function(err, passages){
        if(err){
            res.status(500)
        }
        else{
            res.render('passage/admin/index', {
                passages: passages,
                errorMessage: req.flash('createErrorMessage'),
                successMessage: req.flash('createSuccessMessage')
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
        console.log(err)
    }
    else{
        console.log(passage)
        res.render('passage/admin/edit', {
            passage: passage
        });
    }
})
}

/**
 * Create a new passage
 */
 Controller.create = function (req, res) {

    req.body.user = req.user._id;
    Passage.create(req.body, function(err, result){
        if(err){
            req.flash("createErrorMessage", "Passage Create Error" + JSON.stringify(err));
            res.redirect('/admin/passages');
        }
        else{
            req.flash("createSuccessMessage", "Passage Created Successfully");
            res.redirect('/admin/passages');
        }
    })
};


Controller.update = function (req, res) {
    req.body.user = req.user._id;
    Passage.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/admin/passages');
        }
    })
};

/**
 * Get a single user
 */
 Controller.show = function (req, res) {
    Passage.findOne({slug: req.params.slug}, function(err, passage){
        if(err){
            console.log(err)
        }
        else{
            console.log(passage)
            res.render('passage/admin/show', {
                passage: passage
            })
        }
    })
};



/**
 * Deletes a user
 * restriction: 'admin'
 */
 Controller.destroy = function (req, res) {
    console.log("in destroy")
    Passage.destroy(req.params.id, function(err){
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/admin/passages")
        }
    });


};


module.exports = Controller;
