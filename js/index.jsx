var React = require('react');
var ReactDOM = require('ReactDOM');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var QuizPage = require('./quiz-page');
var LandingPage = require('./landing-page');
var hashHistory = router.hashHistory;

var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={LandingPage}/>
        <Route path="/quiz-page" component={QuizPage}/>
    </Router>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementByID('app'));
});
