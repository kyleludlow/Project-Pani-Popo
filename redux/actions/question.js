var fetch = require('isomorphic-fetch');
var React = require('react');

//action for first question
var GET_QUESTION = 'GET_QUESTION';
var getQuestion = function(token, googleID) {
  var headers = new Headers({
    Authorization: 'Bearer ' + token,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  return function(dispatch) {
    return fetch('/learningtime/' + googleID, {
      method: 'GET',
      headers: headers
    })
    .then(function(response) {
      if (response.status < 200 || response.status >= 300) {
        var err = new Error(response.statusText);
        err.response = response;
        throw err;
      }
      return response.json();
    })
    .then (function(question) {
      return dispatch(getQuestionSuccess(question));
    })
    .catch(function(err) {
      return dispatch(getQuestionFailure(err));
    });
  };
};

//action for subsequent questions
var ANSWER_QUESTION = 'ANSWER_QUESTION';
var answerQuestion = function(googleID, answer) {
  var headers = new Headers({
    Authorization: 'Bearer ' + token,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  return function(dispatch) {
    return fetch('/learningtime/' + googleID + '/' + answer, {
      method: 'POST',
      headers: headers
    })
    .then(function(response) {
      if (response.status < 200 || response.status >= 300) {
        var err = new Error(response.statusText);
        err.response = response;
        throw err;
      }
      return response.json();
    })
    .then (function(question) {
      return dispatch(getQuestionSuccess(question));
    })
    .catch(function(err) {
      return dispatch(getQuestionFailure(err));
    });
  };
};

var GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
var getQuestionSuccess = function(question) {
  console.log('i got your question. yay.');
  return {
    type: GET_QUESTION_SUCCESS,
    question: question
  }
};

var GET_QUESTION_FAILURE = 'GET_QUESTION_FAILURE';
var getQuestionFailure = function() {
  console.log('i am unable to get your question. sorry.');
  return {
    type: GET_QUESTION_FAILURE
  }
};

exports.GET_QUESTION = GET_QUESTION;
exports.getQuestion = getQuestion;

exports.ANSWER_QUESTION = ANSWER_QUESTION;
exports.answerQuestion = answerQuestion;

exports.GET_QUESTION_FAILURE = GET_QUESTION_FAILURE;
exports.getQuestionFailure = getQuestionFailure;
exports.GET_QUESTION_SUCCESS = GET_QUESTION_SUCCESS;
exports.getQuestionSuccess = getQuestionSuccess;
