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

var getNewMValue = function(correct, mValue) {
  if (correct === true) {
    console.log('question correct. newM: ', mValue * 2);
    return mValue * 2;
  }
  else {
    console.log('question incorrect. newM: ', 1);
    return 1;
  }
};

var moveQuestion = function(deck, newMValue) {
  console.log('original deck', deck);

  var card = deck.shift();
  console.log('shifted card', card);
  console.log('shifted deck', deck);

  card.m = newMValue;
  console.log('updated card',card);

  var newCardIndex = 0;
  while(newCardIndex < deck.length && newMValue > deck[newCardIndex].m) {
    newCardIndex = newCardIndex + 1;
  }
  console.log('newCardIndex',newCardIndex);

  deck.splice(newCardIndex, 0, card);
  console.log('new deck', deck);

  return deck;
};

router.post('/learningtime/:userId/:correct', function(req, res) {
  User.findOne(req.params.userId, function(user) {
    var correct = req.params.correct.toString().toLowerCase() === 'true';

    var deck = user.deck;
    var mValue = deck[0].m;

    deck = moveQuestion(deck, getNewMValue(correct, mValue));
    User.updateUserDeck(user._id, deck, function(user) {
      //console.log('the user:', user);
      res.json(user);
    }, function(err) {
      res.status(400).json(err);
    });
  }, function(err) {
    res.status(400).json(err);
  });
});

module.exports = router;
