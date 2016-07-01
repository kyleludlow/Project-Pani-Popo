var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../model/user');

var configAuth = require('./auth');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new GoogleStrategy ({
    clientId: configAuth.googleAuth.clientId,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
  },
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({'google.id': profile.id}, function(err, user) {
        if (err) {
          return done(err);
        }
        //if there is a user, log them in
        if (user) {
          return done(null, user);
        }
        //if not in database, create a new user
        else {
          var newUser = new User();

          newUser.google.id = profile.id;
          newUser.google.token = token;
          newUser.google.name = profile.displayName;
          newUser.google.email = profile.emails[0].value;

          newUser.save(function(err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));
};
