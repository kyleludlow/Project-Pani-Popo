var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var QuizPage = require('./quiz-page.jsx');
var LandingPage = require('./landing-page.jsx');
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var actions = require('../redux/actions.js');
var Provider = require('react-redux').Provider;
var store = require('../redux/store.js');
var connect = require('react-redux').connect;
var Link = require('react-router').Link;

var SamoanKoans = React.createClass({
    render: function() {
        return(
        <div>
            <h1>SAMOAN KOANS</h1>
            <div>
                {this.props.children}
            </div>
            <footer>
                <a href=".">Home</a>
                <a href=".">Login</a>
                <a href=".">Login with Google</a>
                <a href=".">Signup</a>
            </footer>
        </div>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    samoankoans: state
  };
};

var Container = connect(mapStateToProps)(SamoanKoans);

var routes = (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={SamoanKoans}>
                <IndexRoute component={LandingPage} />
                <Route path="/quiz-page" component={QuizPage} />
            </Route>
        </Router>
    </Provider>
);

// document.addEventListener('DOMContentLoaded', function() {
//     ReactDOM.render(
//       routes, document.getElementById('app')
//     );
// });
