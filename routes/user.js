var express = require('express');
var router = express.Router();
var User = require('../services/user');

router.get('/users', function(req, res) {
  User.list(function(users) {
    res.json(users);
  }, function(err) {
    res.status(400).json(err);
  });
});

router.post('/register', function(req, res) {
  User.save(new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  }), function(user) {
    res.status(201).json(user);
  }, function(err) {
    res.status(400).json(err);
  });
});

module.exports = router;
