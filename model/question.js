var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answers: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: String,
    required: true
  },
  correct: {
    type: Boolean,
    default: false
  }
});

var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
