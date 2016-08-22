var fetch = require('isomorphic-fetch');
var React = require('react');

var LOGIN_USER = 'LOGIN_USER';
var loginUser = function(token) {
  var headers = new Headers({
    Authorization: 'Bearer ' + token
  });
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

exports.LOGIN_USER = LOGIN_USER;
exports.loginUser = loginUser;
exports.FETCHED_USER = FETCHED_USER;
exports.fetchedUser = fetchedUser;
