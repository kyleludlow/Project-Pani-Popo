var fetch = require('isomorphic-fetch');
var React = require('react');


// takes question data from db, seperates and sends to react component
var DISPLAY_QUESTION = 'DISPLAY_QUESTION';
var displayQuestion = function(question) {
  return {
    type: DISPLAY_QUESTION,
    question: question
  };
};

// retrieves guess from user to be compared to correct answer
var MAKE_GUESS = 'MAKE_GUESS';
var makeGuess = function(guess) {
  type: MAKE_GUESS,
  guess: guess
};


// retrieves question data from db and dispatches DISPLAY_QUESTION
// will eventually need to send information
function getQuestion(data){
  return function(dispatch){
    return fetch('http//localhost:8080/questions')
    .then(checkStatus)
    .then(function(res){
      dispatch(displayQuestion(res));
    })
  };
};


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300){
    return response.json();
  } else {
    var error = new Error(response.statusText);
    error.response = response.json();
    throw error
  }
}
