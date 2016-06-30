var React = require('react');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var Link = require('react-router').Link;
var store = require('../redux/store.js');
var actions = require('../redux/actions.js');
var connect = require('react-redux').connect;

var Question = React.createClass({
    advanceQuestion: function(event) {
        event.preventDefault();
        this.props.dispatch(actions.DISPLAY_QUESTION);
    },
    render: function() {
        var questionInfo = this.props.questionInfo;
        return (
            <div className="questions">
                <h1>{questionInfo.questionText}</h1>
                <div className="choices">
                    <form>
                        <input type="radio" name="choices" id="r1" value="choice-1"/>
                        <label for="r1">{questionInfo.answers[0]}</label>
                        <input type="radio" name="choices" id="r1" value="choice-2"/>
                        <label for="r2">{questionInfo.answers[1]}</label>
                        <input type="radio" name="choices" id="r1" value="choice-3"/>
                        <label for="r3">{questionInfo.answers[2]}</label>
                        <input type="radio" name="choices" id="r1" value="choice-4"/>
                        <label for="r4">{questionInfo.answers[3]}</label>
                    </form>
                    <button type="submit" className="submitButton">Submit Answer</button>
                    <button type="submit" className="advanceQuestion" onClick={this.advanceQuestion}>Next Question</button>
                </div>
            </div>
        );
    }

});

var mapStateToProps = function(state, props) {
    console.log(state.question);

    var question = state.question[0];
    return {questionInfo: question};
};

var Container = connect(mapStateToProps)(Question);

module.exports = Container;
