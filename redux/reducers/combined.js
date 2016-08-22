var combineReducers = require('redux').combineReducers;

var question = require('./question.js').questionReducer;
var user = require('.user.js').userReducer;

var reducers = combineReducers({
  question: question,
  user: user
});

exports.reducers = reducers;
