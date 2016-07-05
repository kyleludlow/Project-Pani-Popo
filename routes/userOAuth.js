var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var BearerStrategy = require('passport-http-bearer');
var User = require('../services/user');
var UserModel = require('../model/user');
var Question = require('../services/question');
var express = require('express');
var app = express();
// var passport = require('passport');




module.exports = function(app, passport) {

// console.log(passport);




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
        clientID: '554465847624-ru7ire21gsjr0cr765qsuiu7evfaoli7.apps.googleusercontent.com',
        clientSecret: 'iGUcEkvTBGVnlV1hakNuHj4L',
        callbackURL: 'http://localhost:3000/auth/google/learningtime'
    },
    function(accessToken, refreshToken, profile, done) {
      //checks if user exists and creates one if they don't
      //
      //
        // console.log('im the profile     ', profile);
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
            return done(err, user);
        })
    })
  );

  app.get('/userdetails', passport.authenticate('bearer', { session: true }),
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
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      //find the user in DB
      User.findOne(req.user._id, function(user) {
        //if deck is empty, populate it
        if (!user.deck || user.deck.length == 0) {
          Question.list(function(questions){
            //set up array objects that match deck from user schema
            //{questionId: String, m: Number}
            var deck = [];
            for (var i=0; i<questions.length; i++) {
              deck.push({
                questionId: questions[i]._id,
                m: 1});
            }
            user.deck = deck;

            User.save(user, function(user) {
              res.status(201).json(user);
            }, function(err) {
              res.status(400).json(err);
            });
          }, function(err){
              console.log('oops', err);
              res.status(400).json(err);
          });
        } else {
          //either way, user is now set up, so redirect to first/next question
          res.redirect('/userdetails');
        }
      }, function(err) {
        res.status(400).json(err);
      });
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
