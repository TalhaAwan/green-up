// 'use strict';

// var proxyquire = require('proxyquire').noPreserveCache();
// var sinon = require('sinon');
// var expressect = require('chai').expect;
// var supertest = require('supertest');
// var express = require('express');

// var userCtrlStub = {
//   index: 'Controller.index',
//   // destroy: 'userCtrl.destroy',
//   // me: 'userCtrl.me',
//   // changePassword: 'userCtrl.changePassword',
//   // show: 'userCtrl.show',
//   // create: 'userCtrl.create'
// };

// // var authServiceStub = {
// //   isAuthenticated() {
// //     return 'authService.isAuthenticated';
// //   },
// //   hasRole(role) {
// //     return `authService.hasRole.${role}`;
// //   }
// // };

// var routerStub = {
//   get: sinon.spy(),
//   put: sinon.spy(),
//   post: sinon.spy(),
//   delete: sinon.spy()
// };

// // require the index with our stubbed out modules
// // var userIndex = proxyquire('./index', {
//   // express: {
//   //   Router: function() {
//   //     return routerStub;
//   //   }
//   // },
// //   './page.controller': userCtrlStub
// //   // '../../auth/auth.service': authServiceStub
// // });


// describe('Page Router:', function() {

//   // it('should return an express router instance', function() {
//   //   expect(userIndex).to.equal(routerStub);
//   // });

//   describe('GET /pages', function() {
//    var app, indexStub, request, route;

//    beforeEach(function () {
//     // A stub we can use to control conditionals
//     indexStub = sinon.spy();

//       // indexStub = function(){
//       //   console.log("hhelo")
//       // }

//     // Create an express application object
//     // app = express();

//     // Get our router module, with a stubbed out users dependency
//     // we stub this out so we can control the results returned by
//     // the users module to ensure we execute all paths in our code
//     route = proxyquire('./index.js', {
//       // './page.controller': {
//       //   index: indexStub
//       // },
//       express: {
//         Router: function() {
//           return routerStub;
//         }
//       }
//     });

//     // Bind a route to our application
//     // route(app);

//     // Get a supertest instance so we can make requests
//     // request = supertest(app);
//   });

//    it('should route to page.controller.index', function(done) {
//     // console.log("should")

//     require('./index').get('/')
//     // route.get('/');


//     // indexStub.yield();
//     //  request
//     //  .get('/pages')
//     // expect(indexStub).to.have.been.calledOnce;
//     // expect(indexStub).to.have.been.called;
//     // indexStub.should.have.been.called;
//     // done();
//   });
//  });

//   // describe('DELETE /api/users/:id', function() {
//   //   it('should verify admin role and route to user.controller.destroy', function() {
//   //     expect(routerStub.delete
//   //       .withArgs('/:id', 'authService.hasRole.admin', 'userCtrl.destroy')
//   //       ).to.have.been.calledOnce;
//   //   });
//   // });

//   // describe('GET /api/users/me', function() {
//   //   it('should be authenticated and route to user.controller.me', function() {
//   //     expect(routerStub.get
//   //       .withArgs('/me', 'authService.isAuthenticated', 'userCtrl.me')
//   //       ).to.have.been.calledOnce;
//   //   });
//   // });

//   // describe('PUT /api/users/:id/password', function() {
//   //   it('should be authenticated and route to user.controller.changePassword', function() {
//   //     expect(routerStub.put
//   //       .withArgs('/:id/password', 'authService.isAuthenticated', 'userCtrl.changePassword')
//   //       ).to.have.been.calledOnce;
//   //   });
//   // });

//   // describe('GET /api/users/:id', function() {
//   //   it('should be authenticated and route to user.controller.show', function() {
//   //     expect(routerStub.get
//   //       .withArgs('/:id', 'authService.isAuthenticated', 'userCtrl.show')
//   //       ).to.have.been.calledOnce;
//   //   });
//   // });

//   // describe('POST /api/users', function() {
//   //   it('should route to user.controller.create', function() {
//   //     expect(routerStub.post
//   //       .withArgs('/', 'userCtrl.create')
//   //       ).to.have.been.calledOnce;
//   //   });
//   // });
// });
