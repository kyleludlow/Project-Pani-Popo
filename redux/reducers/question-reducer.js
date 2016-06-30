var actions = require('../actions');
var update = require('react-addons-update');


// var initialState = [{
//     questionText: 'i\'m a question',
//     correctAnswer: 1,
//     answers: ['question', 'question', 'question', 'question']
// }];


var initialState = [{
    questionText: null,
    correctAnswer: null,
    answers: null
}];

var questionReducer = function(state, action) {

  state = state || initialState;

  if (action.type === actions.DISPLAY_QUESTION){

console.log('I RAN:   ', action);

    var question = action.question;
    var newState = update(state, {0: {
      $set: {
        questionText: question.question,
        correctAnswer: question.correctAnswer,
        answers: question.answers
      }
    }});

    state = newState;
  }

  else if (action.type == actions.MAKE_GUESS){
    var guess = action.guess;

    if (guess === state[state.length - 1].correctAnswer ){

      return actions.getQuestion(true);

    } else {
      return actions.getQuestion(false);
    }
  }
  console.log(state);
  return state;
}

exports.questionReducer = questionReducer;
