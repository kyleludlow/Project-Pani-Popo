var React = require('react');
var ReactDOM = require('ReactDOM');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var QuizPage = require('./quiz-page');
var LandingPage = require('./landing-page');


var routes = (
    <Router>
        <Route path="/quiz-page" component={QuizPage}/>
        <Route path="/landing-page" component={LandingPage}/>
        
    </Router>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementByID('app'));
});
