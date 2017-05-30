'use strict';
/*eslint no-invalid-this:0*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema

var AttemptSchema = new Schema({
	translation: {type: String, required: true},
	score: {type: Number},
	passage: {type: Schema.Types.ObjectId, ref: 'Passage', required: true},
	user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false},
	deletedAt: {type: Date}
});


AttemptSchema.statics = {
	createIfNotFound : function(attempt, done){
		const self = this;
		self.findOne({passage: attempt.passage, user: attempt.user, deleted: false}, function(err, atmpt){
			if(err){
				done(err)
			}
			else if(atmpt){
				done(403)
			}
			else{
				self.create(attempt, function(err, result){
					if(err){
						done(err);
					}
					else{
						done();
					}
				})
			}
		})
	}
}
module.exports.model = mongoose.model('Attempt', AttemptSchema);
