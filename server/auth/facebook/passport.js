const passport = require( 'passport');
const FacebookStrategy = require( 'passport-facebook').Strategy;

module.exports.setup = function(User, config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: [
    'displayName',
    'emails'
    ]
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({'facebook.id': profile.id}).exec(function(err, user) {
      if(err){
        return done(err)
      }
      else if(user) {
        return done(null, user);
      }
      else{
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          role: 'user',
          provider: 'facebook',
          facebook: profile._json
        });
        user.save(function (err, savedUser){
          if(err){
           return done(err)
         }
         else{
          return done(null, savedUser)
        }

      })
      }
    })
    
  }));
}
