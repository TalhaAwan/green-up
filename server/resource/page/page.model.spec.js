var expect = require('chai').expect;
var sinon = require('sinon');
var Page = require('./page.model.js').model;
var preSave = require('./page.model.js').preSave;

 
describe('Page Model', function() {
	describe('validation', function() {
		it('should be invalid if any of title or statement are empty', function(done) {
			var p = new Page();
			p.validate(function(err) {
				expect(err.errors.title).to.exist;
				expect(err.errors.statement).to.exist;
			
				done();
			});
		});
	});

	describe('preSave', function() {
		it('should add a lowercase, slug to page object using title value', function(done) {
			var p = {title: "This is title", statement: "This is a stement"}
			preSave(p);

			expect(p.slug).to.exist;
			expect(p.slug == p.slug.toLowerCase()).to.be.true;
			done()
		});
	});

	describe('findActive', function() {
	
		it('should call find with deleted:false and invoke callback with pages if pages are present', sinon.test(function() {
			var callback = this.spy();
			var pages = [{_id: 1}, {_id: 2}]
			this.stub(Page, 'find').yields(null, pages);
			Page.findActive(callback);

			sinon.assert.calledWith(Page.find, {
				deleted: false
			});
			sinon.assert.calledWith(callback, null, pages);
		}));

		it('should call find with deleted:false and invoke callback with [] if pages not present', sinon.test(function() {
			var callback = this.spy();
			this.stub(Page, 'find').yields(null, []);
			Page.findActive(callback);

			sinon.assert.calledWith(Page.find, {
				deleted: false
			});
			sinon.assert.calledOnce(callback);
			sinon.assert.calledWith(callback, null, []);
		}));
	});


	describe('destroy', function() {
		it('should findOne page, place true in page.deleted and Date.now in page.deletedAt and then save the updated object', sinon.test(function() {
			var callback = this.spy();
			var page = {
				_id: 1,
				save: function(){
				}
			}
			this.stub(Page, 'findOne').yields(null, page);
			this.stub(page, 'save').yields(null)
			Page.destroy(1, callback);

			sinon.assert.calledOnce(callback);
			sinon.assert.calledWith(Page.findOne, sinon.match.has("_id"));
			expect(page.deleted).to.be.true;
			expect(page.deletedAt).to.exist;
		}));
	});

});