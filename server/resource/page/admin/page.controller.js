'use strict';


const Page = require ( '../page.model').model;
const fs = require('fs');
const path = require('path');
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
//  Controller.create = function (req, res) {
//     console.log(req.body);
//     req.body.user = req.user._id;
//     Page.create(req.body, function(err, page){
//         if(err){

//             // req.flash("createErrorMessage", "page Create Error" + JSON.stringify(err));
//             // res.redirect('/admin/pages');
//             res.status(500).json(err);
//         }
//         else{
//             // req.flash("createSuccessMessage", "page Created Successfully");
//             // res.redirect('/admin/pages');
//             res.status(200).json({message: "Page successfully created!", slug: page.slug});
//         }
//     })
// };


Controller.create = function(req, res){
    console.log("Here")
    var page = new Page(req.body);
    console.log(page)
    try{
            fs.writeFileSync(path.join(__dirname, '../json/'+page.slug+'.json'), JSON.stringify(page, null, 4) , 'utf-8'); 
    }
    catch(err){
        console.log(err)
    }

}


Controller.update = function (req, res) {
    req.body.user = req.user._id;
    console.log(req.body)
    Page.findOneAndUpdate({_id: req.params.id}, req.body, {"new": true}, function(err, page){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            // res.redirect('/admin/pages');
            res.status(200).json({message: "Page successfully updated!", slug: page.slug});
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
