var React = require('react');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var Link = require('react-router').Link;
var store = require('../redux/store.js');
var connect = require('react-redux').connect;

var userActions = require('../redux/actions/user');
var questionActions = require('../redux/actions/question');

var LandingPage = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(questionActions.getQuestion());
  },
  render: function() {
      return (
          <div className="landingPage">
              <div className="greeting">
                  <div className="speechBubble">
                      <h1>AFO MAI!</h1>
                  </div>
              </div>
              <div className="splashContainer">
                  <h2>Welcome! Learn Samoan for free! </h2>
                  <div className="login">
                      <form action="/auth/google">
                          <button type="submit" className="googleLoginButton">LOGIN WITH GOOGLE</button>
                      </form>
                      <a href="https://accounts.google.com/SignUp?hl=en">Don't have a Gmail Account? Click here to sign up for Gmail!</a>
                  </div>
              </div>
          </div>
      );
  }
});

var mapStateToProps = function(state, props) {
  return {
    samoankoans: state
  };
};

var Container = connect(mapStateToProps)(LandingPage);

module.exports = Container;
