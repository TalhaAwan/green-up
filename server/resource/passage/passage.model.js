'use strict';
/*eslint no-invalid-this:0*/
const mongoose = require('mongoose');
const slug = require('slug');
const sanitizeHtml = require('sanitize-html');
const Schema = mongoose.Schema

var PassageSchema = new Schema({
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


PassageSchema
.pre('save', function(next){
  preSave(this);
  next();	
});

PassageSchema
.pre('findOneAndUpdate', function(next){
  this._update.title && this._update.statement? preSave(this._update) : null;
  next();    
});




PassageSchema.statics = {
  findActive: function(callback){
    this.find({deleted: false}, function(err, passages){
      if(err){
        callback(err);
      }
      else{
       callback(null, passages)
     }
   })
  },

  destroy: function(id, callback){
    this.findOne({_id: id}, function(err, passage){
      if(err){
        callback(err);
      }
      else{
        passage.deleted = true;
        passage.deletedAt = Date.now();
        passage.save(function(err, result){
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



var preSave = module.exports.preSave =  function (passage){
  console.log("passage here")
  console.log(passage)
  passage.slug = slug(passage.title, {lower: true});
  passage.statement = sanitizeHtml(passage.statement, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
  });
}

module.exports.model = mongoose.model('Passage', PassageSchema);
