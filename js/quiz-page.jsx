var React = require('react');
var ReactDOM = require('ReactDOM');
var Questions = require('./questions.jsx').Questions;
var Choices = require('./questions.jsx').Choices;

var QuizPage = React.createClass({
    render() {
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

module.exports = QuizPage;
