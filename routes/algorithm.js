var User = require('../services/user');
var Question = require('../services/question');
var express = require('express');
var router = express.Router();
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

module.exports = router;
