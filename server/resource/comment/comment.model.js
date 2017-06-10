'use strict';
/*eslint no-invalid-this:0*/
const mongoose = require('mongoose');
var randomstring = require("randomstring");
const Schema = mongoose.Schema

var CommentSchema = new Schema({
	text: {type: String, required: true},
	page: {type: Schema.Types.ObjectId, ref: 'Page'},
	rtl: {type: Boolean},
	guestUser: {
		name: {type: String, default: function(){
			return "User_"+randomstring.generate(7);
		}}
	},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false},
	deletedAt: {type: Date}
});

CommentSchema.statics = {
	getPloy: function(comment){
		comment["guestUser"].name = comment["guestUser"].name? comment["guestUser"].name : "User_"+randomstring.generate(7);
		return new this(comment);
	}
}

module.exports.model = mongoose.model('Comment', CommentSchema);
