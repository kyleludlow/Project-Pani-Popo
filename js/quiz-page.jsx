var React = require('react');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var Questions = require('./questions.jsx').Questions;
var Choices = require('./questions.jsx').Choices;


var QuizPage = React.createClass({
    render: function(){
        return (
            <div className="quizPage">
                <h1>
                    Samoan Koans
                </h1>
                <div className="questionSection">
                    <Questions/>
                    <div>
                        <Choices/>
                    </div>
                </div>
            </div>
        );
    }

});

exports.QuizPage = QuizPage;
