'use strict';


const Page = require ( '../page.model').model;
const config = require ( '../../../config/environment');
const Controller = {};

/**
 * Get list of users
 * restriction: 'admin'
 */
 Controller.index = function (req, res) {

    Page.findActive(function(err, pages){
        if(err){
            res.status(500)
        }
        else{
            res.render('page/admin/index', {
                pages: pages,
                errorMessage: req.flash('createErrorMessage'),
                successMessage: req.flash('createSuccessMessage')
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
        console.log(err)
    }
    else{
        console.log(page)
        res.render('page/admin/edit', {
            page: page
        });
    }
})
}

/**
 * Create a new page
 */
 Controller.create = function (req, res) {

    req.body.user = req.user._id;
    Page.create(req.body, function(err, result){
        if(err){
            req.flash("createErrorMessage", "page Create Error" + JSON.stringify(err));
            res.redirect('/admin/pages');
        }
        else{
            req.flash("createSuccessMessage", "page Created Successfully");
            res.redirect('/admin/pages');
        }
    })
};


Controller.update = function (req, res) {
    req.body.user = req.user._id;
    Page.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/admin/pages');
        }
    })
};

/**
 * Get a single user
 */
 Controller.show = function (req, res) {
    Page.findOne({slug: req.params.slug}, function(err, page){
        if(err){
            console.log(err)
        }
        else{
            console.log(page)
            res.render('page/admin/show', {
                page: page
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
    Page.destroy(req.params.id, function(err){
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/admin/pages")
        }
    });


};


module.exports = Controller;
