var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Question = require('../services/question');

//TODO: get actual file names when done with models
var Question = require('./questions');

router.get('/questions', function(req, res) {
    Question.find({}, function(err, users) {
        res.json(questions);
    });
});

module.exports = router;
