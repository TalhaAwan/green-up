'use strict';


const async = require ('async');
const moment = require('moment');
const glob = require("glob");
const readMultipleFiles = require('read-multiple-files');
const paginate = require('paginate')();
var fs = require('fs');
var path = require('path');
const Page = require ( './page.model').model;
const Comment = require ( '../comment/comment.model').model;
const config = require ( '../../config/environment');
const Controller = {};



Controller.directory = function (req, res, next) {
    console.log("Here in directory");

    const dir = path.join(__dirname, "./json/");
    var pageNum;
    var arrIndex;
    var itemsPerPage = 5;
    var totalPages;
    if(!isNaN(req.query.page)){
        pageNum = parseInt(req.query.page);
        if(pageNum <= 1){
          arrIndex = 0;
          pageNum = 1;
        }
        else{
            arrIndex = pageNum*itemsPerPage;  
        }
        
    }
    else{
        pageNum = 1;
        arrIndex = 0;
    }
    
    glob("*json", {cwd: './server/resource/page/json'}, function (err, files) {
        console.log(err, files);
        if (err) {
            return res.status(500)
        }
        else if(!files.length){
            // var err = new Error('Oops! The Page Cannot Be Found');
            // err.status = 404;
            // return next(err);
            res.render('page/directory', {
                pages: [],
                paginationHtml : paginationHtml
            });
        }
        else{
            totalPages = files.length;
            files = files.splice(arrIndex? arrIndex-itemsPerPage : 0, itemsPerPage);
            files = files.map(function(sp){ return dir+sp});

            var pagination = paginate.page(totalPages, itemsPerPage, pageNum);
            var paginationHtml = pagination.render({ baseUrl: '/directory/' });
            readMultipleFiles(files, 'utf8', function(err, contents){
                if (err) {
                    res.status(500)
                }
                else{
                    res.render('page/directory', {
                        pages: contents.map(function(c){return JSON.parse(c)}),
                        paginationHtml : paginationHtml
                    });
                }
            });
        }
    });

  
};


Controller.index = function (req, res, next) {
    console.log("Here")

    var pageNum;
    var arrIndex;
    var itemsPerPage = 2;
    var totalPages;
    if(!isNaN(req.query.page)){
        pageNum = parseInt(req.query.page);
        if(pageNum <= 1){
          arrIndex = 0;
          pageNum = 1;
        }
        else{
            arrIndex = pageNum*itemsPerPage;  
        }
        
    }
    else{
        pageNum = 1;
        arrIndex = 0;
    }

    const dir = path.join(__dirname, "./json/");
    var sortedPages = JSON.parse(fs.readFileSync(path.join(__dirname, "./sorted-pages.json")));
    totalPages = sortedPages.length;
    sortedPages = sortedPages.splice(arrIndex? arrIndex-itemsPerPage : 0, itemsPerPage);
    if(!sortedPages.length){
        var err = new Error('Oops! The Page Cannot Be Found');
        err.status = 404;
        return next(err);
    }

    sortedPages = sortedPages.map(function(sp){ return dir+sp});
 
     var pagination = paginate.page(totalPages, itemsPerPage, pageNum);
     var paginationHtml = pagination.render({ baseUrl: '/' });



    readMultipleFiles(sortedPages, 'utf8', function(err, contents){
      if (err) {
        res.status(500)
    }
    else{
        // console.log(contents.length)

        res.render('page/index', {
                pages: contents.map(function(c){return JSON.parse(c)}),
                paginationHtml : paginationHtml
            });
    }


});
  
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



Controller.show = function(req, res, next){

    if (fs.existsSync(path.join(__dirname, "./json/"+req.params.slug+".json"))) {
        console.log("File exists");
        var page;
        try{
            page = JSON.parse(fs.readFileSync(path.join(__dirname, "./json/"+req.params.slug+".json")));
        }
        catch(err){
            var err = new Error('Oops! Something Went Wrong');
            err.status = 500;
            return next(err);
        }
        res.render('page/show', {
            page: page,
            comments: [],
            moment: moment
        });

        console.timeEnd('someFunction');
    }
    else{
        console.log("File doesn't exist");
        var err = new Error('Oops! The Page Cannot Be Found');
        err.status = 404;
        next(err);
    }

}


Controller.comments = function (req, res) {
    Comment.find({page: req.params.id, _id: { $gt: req.query.commentId }}, function(err, comments){
        if(err){
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
