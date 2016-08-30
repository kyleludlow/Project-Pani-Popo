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
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  //returns user details
  passport.use(new BearerStrategy(
    function(token, done) {
      UserModel.findOne({ accessToken: token },
        function(err, user) {
          if (err) {
              return done(err)
          }
          if (!user) {
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
          console.log('user in strat', user.googleID, user.accessToken);
          if (user && !user.deck) {
            Question.list(function(questions) {
              //set up array objects that match deck from user schema
              //{questionId: String, m: Number}
              var deck = [];
              for (var i=0; i<questions.length; i++) {
                deck.push({
                  questionId: questions[i]._id,
                  m: 1});
              }
              User.updateUserDeck(user._id, deck, function(user) {
              }, function(err) {
                return done(err, user);
              });
            }, function(err) {
              return done(err, user);
            });
          }
          else {
            return done(err, user);
          }
      });
    })
  );

  app.get('/userdetails', passport.authenticate('bearer', { session: false }),
    function(req, res) {
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
      res.redirect('http://localhost:8080/#/quiz-page/');
  });
};
