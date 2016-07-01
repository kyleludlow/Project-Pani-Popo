var React = require('react');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var Link = require('react-router').Link;
var store = require('../redux/store.js');
var actions = require('../redux/actions.js');
var connect = require('react-redux').connect;

var LandingPage = React.createClass({

  componentDidMount: function (){
    this.props.dispatch(actions.getQuestion());
  },
    startQuestions: function (event){
        event.preventDefault();
        this.props.dispatch(actions.getQuestion());
        hashHistory.push('/quiz-page');
    },
    render: function () {
        return (
            <div className="landingPage">
                <div className="greeting">
                    <div className="speechBubble">
                        <h1>AFO MAI!</h1>
                    </div>
                </div>
                <div className="splashContainer">
                    <h2>Welcome! Learn Samoan For Free! </h2>
                    <h3>You have already learned your first word!</h3>
                    <div className="login">
                        <button type="submit" className="googleLoginButton" onClick={this.startQuestions}>LOGIN WITH GOOGLE</button>
                        <a href="https://accounts.google.com/SignUp?hl=en">Don't have a Gmail Account? Click Here to SignUp for GMail!</a>
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
