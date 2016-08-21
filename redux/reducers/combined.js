var combineReducers = require('redux').combineReducers;

var question = require('./question-reducer.js').questionReducer;

var reducers = combineReducers({
  question: question
});

exports.reducers = reducers;
