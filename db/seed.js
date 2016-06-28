require('./connect');

var Question = require('../model/question');
var questionList = require('./questions')
var mongoose = require('mongoose');

//adds questions to database

var seedQuestions = function(questionList) {
  for (var i=0; i<questionList.length; i++) {
    Question.create(questionList[i], function(err) {
      if (err) {
        console.log('THE ERROR:', err);
        return;
      }
    });
  }
  mongoose.disconnect();
};

seedQuestions(questionList);
