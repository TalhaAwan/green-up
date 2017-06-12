'use strict';
/*eslint no-invalid-this:0*/
const mongoose = require('mongoose');
const slug = require('slug');
const sanitizeHtml = require('sanitize-html');
const Schema = mongoose.Schema

var PageSchema = new Schema({
  title: {type: String, required: true},
  slug: {
    type: String,
    lowercase: true,
    index: {unique: true}
  },
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  statement: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  deleted: {type: Boolean, default: false},
  deletedAt: {type: Date}
});


PageSchema
.pre('save', function(next){
  preSave(this);
  next();	
});

PageSchema
.pre('findOneAndUpdate', function(next){
  this._update.title && this._update.statement? preSave(this._update) : null;
  next();    
});




PageSchema.statics = {
  findActive: function(callback){
    this.find({deleted: false}, function(err, pages){
      if(err){
        callback(err);
      }
      else{
       callback(null, pages)
     }
   })
  },

  destroy: function(id, callback){
    this.findOne({_id: id}, function(err, page){
      if(err){
        callback(err);
      }
      else{
        page.deleted = true;
        page.deletedAt = Date.now();
        page.save(function(err, result){
          if(err){
            callback(err);
          }
          else{
            callback();
          }
        })
      }
    })
  }
};



var preSave = module.exports.preSave =  function (page){
  console.log("page here")
  console.log(page)
  page.slug = slug(page.title, {lower: true});
  page.statement = sanitizeHtml(page.statement, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'iframe' ]),
    allowedAttributes: {
      iframe : ['width', 'height', 'src', 'frameborder', 'allowfullscreen', 'style']
    }
  });
}

module.exports.model = mongoose.model('Page', PageSchema);
