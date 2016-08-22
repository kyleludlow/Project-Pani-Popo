var actions = require('../actions/question');
var update = require('react-addons-update');

var initialState = [{
    questionText: null,
    answers: null,
    correctAnswer: null
}];

var questionReducer = function(state, action) {
  state = state || initialState;

  if (action.type === actions.GET_QUESTION_SUCCESS) {
    console.log('========== GET QUESTION SUCCESS =========');
    var newState = update(state, {
      $set: {
        questionText: action.question.questionText,
        answers: action.question.answers,
        correctAnswer: action.question.correctAnswer
      }
    });
    state = newState;
  }
  else if (action.type === actions.GET_QUESTION_FAILURE) {
    console.log('========== GET QUESTION FAILURE =========');
  }
  return state;
}

exports.questionReducer = questionReducer;
