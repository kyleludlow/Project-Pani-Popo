var User = require('../services/user');
var Question = require('../services/question');
var express = require('express');
var router = express.Router();
var QuestionModel = require('../model/question');
var auto = require('run-auto');

// algorithm routes:
//
// GET /{userId}
// returns the next question and answers and correct answer

router.get('/learningtime/:userId', function(req, res) {
  console.log('looking for Id',req.params.userId);
  User.findOne(req.params.userId, function(user) {
    console.log('i found:', user);
    var questionId = user.deck[0].questionId;
    console.log(questionId);
    Question.findOne(questionId, function(question) {
      console.log(question);
      res.json(question);
    }, function(err) {
      res.status(400).json(err);
    });
  }, function(err) {
    res.status(400).json(err);
  });
});

// POST /{userId}/{true or false}
// updates the persisted question order as necessary

router.post('/learningtime/:userId/:trueorfalse', function(req, res) {
  User.findOne(req.params.userId, function(user) {
    //find the first question for that user
    var deck = user.deck;
    var mValue = deck[0].m;
    console.log('mValue before:', mValue);
    var card = deck[0]
    console.log('card', card);
    var correctUserAnswer = function() {
      return true;
    };

    var wrongUserAnswer = function() {
      return false
    };

    var getNewMValue = function(correct) {
      if (correct === true) {
        return mValue * 2;
      }
      else if (correct === false) {
        return 1;
      }
    };

    console.log('mValue after:', mValue);

    var moveQuestion = function(deck, card, getNewMValue) {
      var n = getNewMValue;
      console.log('n', n);
      console.log('deckkkk', deck);
      deck.splice(n, 0, card);
      var newDeck = deck;
      console.log('newDeck', newDeck);
      return newDeck;
    }

    deck = moveQuestion(deck, deck[0], getNewMValue(correctUserAnswer()));
    console.log(deck);
  }, function(err) {
    res.status(400).json(err);
  });
});

// router.post('/learningtime/:userId', function(req, res) {
//   console.log('looking for', req.params.userId);
//   auto({
//     checkUserExists: function(callback) {
//       User.findOne(req.params.userId).exec(callback);
//     },
//     //if user exists, make sure user has questions
//     checkQuestionsExist: ['checkUerExists', function(results, callback) {
//       if (results.checkUserExists === null) {
//         callback(true);
//       }
//       else {
//         QuestionModel.find().exec(callback)
//       }
//     }],
//     //if user exists and has questions, provide first question in deck
//     respondWithQuestion: ['checkQuestionsExist', function(results, callback) {
//       console.log(results);
//     }]
//   }, function(err, results) {
//     console.log('error:', err);
//     if (err) {
//       res.status(400).json({error: 'User was not found. Please register.'})
//     }
//   })
//   res.status(200);
// });

module.exports = router;
