var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Question = require('../services/question');

router.get('/questions', function(req, res) {
    Question.list(function(questions) {
        res.json(questions);
    }, function(err) {
        res.status(400).json(err);
    });
});

router.post('/questions', function(req, res) {
    Question.save(req.body.name, function(question) {
        res.status(201).json(question);
    }, function(err) {
        res.status(400).json(err);
    });
});

module.exports = router;
