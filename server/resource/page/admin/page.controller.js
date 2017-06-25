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


// Controller.getEditView = function(req, res){
//  Page.findOne({_id: req.params.id}, function(err, page){
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(page)
//         res.render('page/admin/edit', {
//             page: page
//         });
//     }
// })
// }



Controller.getEditView = function(req, res, next){
 if (fs.existsSync(path.join(__dirname, "../json/"+req.params.id+".json"))) {
        
        var page;
        try{
            page = JSON.parse(fs.readFileSync(path.join(__dirname, "../json/"+req.params.id+".json")));
        }
        catch(err){
            var err = new Error('Oops! Something Went Wrong');
            err.status = 500;
            return next(err);
        }
        res.render('page/admin/edit', {
            page: page
        });
    }
    else{
        var err = new Error('Oops! The Page Cannot Be Found');
        err.status = 404;
        next(err);
    }
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
    var page = new Page(req.body);
    if (fs.existsSync(path.join(__dirname, "../json/"+page.slug+".json"))) {
        console.log("File exists");
        return res.status(400).json({"message": "file already exists"});
    }
    else{
       try{
        fs.writeFileSync(path.join(__dirname, '../json/'+page.slug+'.json'), JSON.stringify(page, null, 4) , 'utf-8');
            var dir = path.join(__dirname, "../json/"); // your director
            var files = fs.readdirSync(dir);
            files.sort(function(a, b) {

               // return fs.statSync(dir + a).mtime.getTime() - 
               // fs.statSync(dir + b).mtime.getTime() < 1;

               return new Date(fs.statSync(dir + b).mtime.getTime()) - new Date(fs.statSync(dir + a).mtime.getTime());
           });
            console.log(files);
        fs.writeFileSync(path.join(__dirname, '../sorted-pages.json'), JSON.stringify(files, null, 4) , 'utf-8');
        return res.status(200).json({message: "Page successfully created!", slug: page.slug});
    }
    catch(err){
       return res.status(500).json(err);
       console.log(err)
   }
}


}


// Controller.update = function (req, res) {
//     req.body.user = req.user._id;
//     console.log(req.body)
//     Page.findOneAndUpdate({_id: req.params.id}, req.body, {"new": true}, function(err, page){
//         if(err){
//             console.log(err);
//             res.status(500).json(err);
//         }
//         else{
//             // res.redirect('/admin/pages');
//             res.status(200).json({message: "Page successfully updated!", slug: page.slug});
//         }
//     })
// };

Controller.update = function (req, res) {
     var page;
        try{
            page = JSON.parse(fs.readFileSync(path.join(__dirname, "../json/"+req.params.id+".json")));
        }
        catch(err){
            var err = new Error('Oops! Something Went Wrong');
            err.status = 500;
            return next(err);
        }
        var updatedPage = new Page(req.body);
        updatedPage.createdAt = page.createdAt;

    try{
        fs.writeFileSync(path.join(__dirname, '../json/'+updatedPage.slug+'.json'), JSON.stringify(updatedPage, null, 4) , 'utf-8');
                    var dir = path.join(__dirname, "../json/"); // your director
            var files = fs.readdirSync(dir);
            files.sort(function(a, b) {

               // return fs.statSync(dir + a).mtime.getTime() - 
               // fs.statSync(dir + b).mtime.getTime() < 1;

               return new Date(fs.statSync(dir + b).mtime.getTime()) - new Date(fs.statSync(dir + a).mtime.getTime());
           });
            console.log(files);
        fs.writeFileSync(path.join(__dirname, '../sorted-pages.json'), JSON.stringify(files, null, 4) , 'utf-8');
        return res.status(200).json({message: "Page successfully updated!", slug: updatedPage.slug});
    }
    catch(err){
       return res.status(500).json(err);
   }


};

/**
 * Get a single user
 */
//  Controller.show = function (req, res) {
//     Page.findOne({slug: req.params.slug}, function(err, page){
//         if(err){
//             console.log(err)
//         }
//         else{
//             console.log(page)
//             res.render('page/admin/show', {
//                 page: page
//             })
//         }
//     })
// };


 Controller.show = function (req, res, next) {
 if (fs.existsSync(path.join(__dirname, "../json/"+req.params.slug+".json"))) {
        var page;
        try{
            page = JSON.parse(fs.readFileSync(path.join(__dirname, "../json/"+req.params.slug+".json")));
        }
        catch(err){
            var err = new Error('Oops! Something Went Wrong');
            err.status = 500;
            return next(err);
        }
        res.render('page/admin/show', {
            page: page
        });
    }
    else{
        var err = new Error('Oops! The Page Cannot Be Found');
        err.status = 404;
        next(err);
    }
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
