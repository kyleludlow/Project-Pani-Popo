var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var QuizPage = require('./quiz-page').QuizPage;
var LandingPage = require('./landing-page').LandingPage;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;

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
    )}
});


var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={SamoanKoans}>
            <IndexRoute component={LandingPage}/>
                <Route path="/quiz-page" component ={QuizPage}/>
        </Route>
    </Router>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});
