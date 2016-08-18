var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var BearerStrategy = require('passport-http-bearer');
var User = require('../services/user');
var UserModel = require('../model/user');
var Question = require('../services/question');
var express = require('express');
var app = express();
var passport = require('passport');

module.exports = function(app, passport) {
  passport.serializeUser(function(user, done) {
      console.log('serializeUSER');
      done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    console.log('DEserializeUSER');
    done(null, user);
  });

  //returns user details
  passport.use(new BearerStrategy(
    function(token, done) {
      console.log('BEAR STRATEGY');
      UserModel.findOne({ accessToken: token },
        function(err, user) {
          if(err) {
              return done(err)
          }
          if(!user) {
              return done(null, false)
          }
          return done(null, user, { scope: ['https://www.googleapis.com/auth/plus.login'] })
        }
      );
    }
  ));

  //Oauth Strategy

  passport.use(new GoogleStrategy({
        clientID: '794120931813-trc0ud5d8g4e3a6o8aan7vqc90nkqc6m.apps.googleusercontent.com',
        clientSecret: 'ToKMdK8ZU3y9QeWuO5RZh4T2',
        callbackURL: 'http://127.0.0.1:3000/auth/google/learningtime'
    },
    function(accessToken, refreshToken, profile, done) {
      //checks if user exists and creates one if they don't
        console.log('im the profile     ', profile);
        UserModel.findOneAndUpdate({
            googleID: profile.id
        }, {
            fullName: profile.displayName,
            firstName: profile.name.givenName,
            accessToken: accessToken
        }, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }, function(err, user) {
          console.log('im the user:     ' , user);
            return done(err, user);
        })
    })
  );

  app.get('/userdetails', passport.authenticate('bearer', { session: false }),
    function(req, res) {
      console.log('REQUEST USER', req.user);
      res.json(req.user);
    }
  );
  //info you want to retrieve from google
  app.get('/auth/google', passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login']
    })
  );

  app.get('/auth/google/learningtime',
    passport.authenticate('google', { failureRedirect: '/auth/google' }),
    function(req, res) {
      console.log('req.user', req.user);

      res.redirect('/learningtime/' + req.user.accessToken);
  });

  // app.get('/learningtime', passport.authenticate('google', {
  //   failureRedirect: '/'
  //   }),
  //   function(req, res) {
  //     User.findOne(req.params.userId, function(user) {
  //       var questionId = user.deck[0].questionId;
  //       Question.findOne(questionId, function(question) {
  //         res.json(question);
  //       }, function(err) {
  //         res.status(400).json(err);
  //       });
  //     }, function(err) {
  //       res.status(400).json(err);
  //     });
  // });
}
