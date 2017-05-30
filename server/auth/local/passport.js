const passport = require( 'passport')
const LocalStrategy = require( 'passport-local').Strategy

function localAuthenticate(User, email, password, done) {
  User.findOne({
    email: email.toLowerCase()
  }).exec(function(err, user) {
    if(err){
      return done(err);
    }
    else if(!user) {
      return done(null, false, {
        message: 'This email is not registered.'
      });
    }
    else{
     user.authenticate(password, function(authError, authenticated) {
      if(authError) {
        return done(authError);
      }
      if(!authenticated) {
        return done(null, false, { message: 'This password is not correct.' });
      } else {
        return done(null, user);
      }
    });
   }
   
 })
  
}

module.exports.setup = function (User/*, config*/) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
    
    passport.use(new LocalStrategy({
      usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function(email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
  }
