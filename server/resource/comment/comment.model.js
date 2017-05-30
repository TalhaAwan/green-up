'use strict';
/*eslint no-invalid-this:0*/
const mongoose = require('mongoose');
var randomstring = require("randomstring");
const Schema = mongoose.Schema

var CommentSchema = new Schema({
	text: {type: String, required: true},
	page: {type: Schema.Types.ObjectId, ref: 'Page'},
	attempt: {type: Schema.Types.ObjectId, ref: 'Attempt'},
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	guestUser: {
		name: {type: String, default: function(){
			return "User_"+randomstring.generate(7);
		}},
		email: {type: String},
	},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false},
	deletedAt: {type: Date}
});

module.exports.model = mongoose.model('Comment', CommentSchema);
