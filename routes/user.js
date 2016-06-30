var express = require('express');
var router = express.Router();
var User = require('../services/user');
var Question = require('../services/question');

//gets all users

router.get('/users', function(req, res) {
  User.list(function(users) {
    res.json(users);
  }, function(err) {
    res.status(400).json(err);
  });
});

//create users at registration endpoint

router.post('/users', function(req, res) {
  //get list of all questions
  Question.list(function(questions){
    //set up array objects that match deck from user schema
    //{questionId: String, m: Number}
    var deck = [];
    for (var i=0; i<questions.length; i++) {
      deck.push({
        questionId: questions[i]._id,
        m: 1});
    }

    User.save({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      //use the set up objects as deck
      deck: deck
    }, function(user) {
      res.status(201).json(user);
    }, function(err) {
      res.status(400).json(err);
    });
  },
    function(err){
      console.log('oops', err);
      res.status(400).json(err);
    });
});

module.exports = router;
