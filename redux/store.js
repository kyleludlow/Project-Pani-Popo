var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var thunk = require('redux-thunk').default;

var combined = require('./reducers/combined');


var store = createStore(combined.reducers, applyMiddleware(thunk));
module.exports = store;
