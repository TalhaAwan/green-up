var expect = require('chai').expect;
var sinon = require('sinon');
var Controller = require('./page.controller.js');
var Page = require('./page.model.js').model;

describe('Page Controller', function() {
	describe('index', function() {
		var res = {
			render: function(){},
			status: function(){}
		};
		var req = {};

		it('should return active pages', sinon.test(function() {
			var pages = [{_id: 1}, {_id: 2}]
			
			this.stub(res, 'render');
			this.stub(Page, 'findActive').yields(null, pages);
			Controller.index(req, res);

			sinon.assert.calledWith(res.render, 
				'page/index', {
					pages: pages
				});
		}));

		it('should return status 500', sinon.test(function() {
			
			this.stub(res, 'status');
			this.stub(Page, 'findActive').yields({});
			Controller.index(req, res);

			sinon.assert.calledWith(res.status, 500);
		}));
	});
});




