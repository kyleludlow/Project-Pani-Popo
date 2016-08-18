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
  return {
      type: MAKE_GUESS,
      guess: guess
  };
};

// will give user results for session or account history
var DISPLAY_RESULTS = 'DISPLAY_RESULTS';
var getResults = function(results) {
    return {
        type: DISPLAY_RESULTS,
        results: results
    };
};

var LOGIN_USER = 'LOGIN_USER';
var loginUser = function(token) {
    console.log('logging in the user');
    return function(dispatch) {
      return fetch('/userdetails', {headers: headers})
      .then(function(res) {
        return res.json();
      })
      .then(function(user) {
        return dispatch(fetchedUser(user));
      })
    }
};

var FETCHED_USER = 'FETCHED_USER';
var fetchedUser = function(user) {
  return {
    type: 'FETCHED_USER',
    user: user
  }
};

// retrieves question data from db and dispatches DISPLAY_QUESTION
// will eventually need to send information
function getQuestion(data) {
  return function(dispatch) {
    return fetch('http://localhost:3000/questions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(function(res) {
      dispatch(displayQuestion(res));
    })
  };
};

//retrieves user progress results from db and dispatches DISPLAY_RESULTS
function getResults(user) {
  return function(dispatch) {
    return fetch('http//localhost:3000/' + user)
    .then(checkStatus)
    .then(function(res) {
      dispatch(displayResults(res));
    })
  };
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    console.log('made it into checkStatus 200');
    return response.json();
  }
  else {
    console.log('made it into checkStatus 400');
    var error = new Error(response.statusText);
    error.response = response.json();
    throw error
  }
};

exports.getQuestion = getQuestion;
exports.DISPLAY_QUESTION = DISPLAY_QUESTION;
exports.displayQuestion = displayQuestion;
exports.makeGuess = makeGuess;
exports.MAKE_GUESS = MAKE_GUESS;
exports.LOGIN_USER = LOGIN_USER;
exports.loginUser = loginUser;
exports.FETCHED_USER = FETCHED_USER;
exports.fetchedUser = fetchedUser;
