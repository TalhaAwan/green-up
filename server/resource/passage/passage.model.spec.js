var expect = require('chai').expect;
var sinon = require('sinon');
var Passage = require('./passage.model.js').model;
var preSave = require('./passage.model.js').preSave;

 
describe('Passage Model', function() {
	describe('validation', function() {
		it('should be invalid if any of title or statement are empty', function(done) {
			var p = new Passage();
			p.validate(function(err) {
				expect(err.errors.title).to.exist;
				expect(err.errors.statement).to.exist;
			
				done();
			});
		});
	});

	describe('preSave', function() {
		it('should add a lowercase, slug to passage object using title value', function(done) {
			var p = {title: "This is title", statement: "This is a stement"}
			preSave(p);

			expect(p.slug).to.exist;
			expect(p.slug == p.slug.toLowerCase()).to.be.true;
			done()
		});
	});

	describe('findActive', function() {
	
		it('should call find with deleted:false and invoke callback with passages if passages are present', sinon.test(function() {
			var callback = this.spy();
			var passages = [{_id: 1}, {_id: 2}]
			this.stub(Passage, 'find').yields(null, passages);
			Passage.findActive(callback);

			sinon.assert.calledWith(Passage.find, {
				deleted: false
			});
			sinon.assert.calledWith(callback, null, passages);
		}));

		it('should call find with deleted:false and invoke callback with [] if passages not present', sinon.test(function() {
			var callback = this.spy();
			this.stub(Passage, 'find').yields(null, []);
			Passage.findActive(callback);

			sinon.assert.calledWith(Passage.find, {
				deleted: false
			});
			sinon.assert.calledOnce(callback);
			sinon.assert.calledWith(callback, null, []);
		}));
	});


	describe('destroy', function() {
		it('should findOne passage, place true in passage.deleted and Date.now in passage.deletedAt and then save the updated object', sinon.test(function() {
			var callback = this.spy();
			var passage = {
				_id: 1,
				save: function(){
				}
			}
			this.stub(Passage, 'findOne').yields(null, passage);
			this.stub(passage, 'save').yields(null)
			Passage.destroy(1, callback);

			sinon.assert.calledOnce(callback);
			sinon.assert.calledWith(Passage.findOne, sinon.match.has("_id"));
			expect(passage.deleted).to.be.true;
			expect(passage.deletedAt).to.exist;
		}));
	});

});