var React = require('react');
var ReactDOM = require('ReactDOM');

var Questions = React.createClass({
    render() {
        return (
                    <div className="questions">
                        // How do you say hello in Samoan?
                    </div>
                </div>
        );
    }

});

var Answers = React.createClass({
    render() {
        return (
            <div className="answers">
                <form>
                    // TODO: PLACE ANSWERS CHOICES HERE
                    // <input type="radio" name="choices" value="choice-1"> Bonjour
                    //     <br>
                    // <input type="radio" name="choices" value="choice-2"> Talofa
                    //     <br>
                    // <input type="radio" name="choices" value="choice-3"> Como Estas?
                    //     <br>
                </form>
                <button type="submit" class="submitButton">Submit Answer
                </button>
            </div>
        );
    }

});

var QuestionPage = React.createClass({
    render() {
        return (
            <div className="quizPage">
                <h1>
                    Samoan Koans
                </h1>
                <div className="questionSection">
                    <Questions />
                    <div>
                        <Answers />
                    </div>
                </div>
            </div>
            //TODO: place quiz page title, question, and answers in this section<div />
        );
    }

});

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(//TODO: what routes to render)
})
