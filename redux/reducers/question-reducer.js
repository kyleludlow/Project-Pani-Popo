var actions = require('../actions');
var update = require('react-addons-update');



var initialState = [{
    questionText: null,
    correctAnswer: null,
    answers: null,
    userAnswer: null
}];

var questionReducer = function(state, action) {

  state = state || initialState;

  if (action.type === actions.DISPLAY_QUESTION){


    var question = action.question;
    var newState = update(state, {0: {

        questionText: {$set:question.question},
        correctAnswer: {$set: question.correctAnswer},
        answers: {$set: question.answers}
      
    }});

    return newState;
  }

  else if (action.type == actions.MAKE_GUESS){
    var guess = action.guess;

      var newState = update(state, {0:
        {userAnswer: {$set: guess}
        }
      });

      return newState;
    }

  return state;
}

exports.questionReducer = questionReducer;
