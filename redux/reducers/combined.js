var combineReducers = require('redux').combineReducers;

var question = require(./question).questionReducer;


var reducers = combineReducers({
  question: question
});


exports.reducers = reducers;
