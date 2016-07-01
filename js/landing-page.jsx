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
                <h1>AFO MAI!</h1>
                <h1>Welcome to Samoan Koans!</h1>
                <h1>The smartest way to learn Samoan!</h1>
                <img src="" alt="SOME SAMOAN IMAGE" className="loginImage"/>
                    <div className="login">
                        <div className="loginFields">
                            <input type="text" placeholder="Enter Your Username" />
                            <input type="text" placeholder="Enter Your Password" />
                        </div>
                        <button type="submit" className="loginButton">Login
                        </button>
                        <a href="">Don't Have an Account? Click Here to Signup!</a>
                        <button type="submit" className="googleLoginButton" onClick={this.startQuestions}>Login with Google</button>
                        <a href="">Dont have a Gmail Account Click Here to SignUp for GMail</a>
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
