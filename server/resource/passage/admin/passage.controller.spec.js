var expect = require('chai').expect;
var sinon = require('sinon');
var Controller = require('./passage.controller.js');
var Passage = require('../passage.model.js').model;

describe('Passage Admin Controller', function() {
	describe('index', function() {
		var res = {
			render: function(){},
			status: function(){}
		};
		var req = {};

		it('should return active passages', sinon.test(function() {
			var passages = [{_id: 1}, {_id: 2}]
			
			this.stub(res, 'render');
			this.stub(Passage, 'findActive').yields(null, passages);
			Controller.index(req, res);

			sinon.assert.calledWith(res.render, 
				'passage/admin/index', {
					passages: passages
				});
		}));

		it('should return status 500', sinon.test(function() {
			
			this.stub(res, 'status');
			this.stub(Passage, 'findActive').yields({});
			Controller.index(req, res);

			sinon.assert.calledWith(res.status, 500);
		}));
	});
});




