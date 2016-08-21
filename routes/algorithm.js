var User = require('../services/user');
var Question = require('../services/question');
var express = require('express');
var router = express.Router();
var QuestionModel = require('../model/question');
var auto = require('run-auto');

// algorithm routes:
// GET /{userId}
// returns the next question and answers and correct answer

router.get('/learningtime/:userId', function(req, res) {
  console.log('userId in learningtime', req.params.userId);
  User.findOne(req.params.userId, function(user) {
    console.log('user in learningtime', user.googleID, user.accessToken);
    var questionId = user.deck[0].questionId;
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

var getNewMValue = function(correct, mValue) {
  if (correct === true) {
    return mValue * 2;
  }
  else {
    return 1;
  }
};

var moveQuestion = function(deck, newMValue) {
  var card = deck.shift();

  card.m = newMValue;

  var newCardIndex = 0;
  while(newCardIndex < deck.length && newMValue > deck[newCardIndex].m) {
    newCardIndex = newCardIndex + 1;
  }

  deck.splice(newCardIndex, 0, card);
  console.log('new deck', deck[0]);

  return deck;
};

router.post('/learningtime/:userId/:correct', function(req, res) {
  User.findOne(req.params.userId, function(user) {
    var correct = req.params.correct.toString().toLowerCase() === 'true';

    var deck = user.deck;
    var mValue = deck[0].m;

    deck = moveQuestion(deck, getNewMValue(correct, mValue));
    User.updateUserDeck(user._id, deck, function(user) {
      var questionId = user.deck[0].questionId;
      Question.findOne(questionId, function(question) {
        console.log(question);
        res.json(question);
      }, function(err) {
        res.status(400).json(err);
      });
    }, function(err) {
      res.status(400).json(err);
    });

  }, function(err) {
    res.status(400).json(err);
  });
});

module.exports = router;
