var actions = require('../actions/user');
var update = require('react-addons-update');

var initialState = [{
    googleID: null,
    firstName: null,
    accessToken: null
}];

var userReducer = function(state, action) {
  state = state || initialState;

  if (action.type === actions.FETCHED_USER) {
    var newState = update(state, {
      $set: {
        googleID: action.user.googleID,
        firstName: action.user.firstName,
        accessToken: action.user.accessToken
      }
    });
    state = newState;
  }
  return state;
}

exports.userReducer = userReducer;
