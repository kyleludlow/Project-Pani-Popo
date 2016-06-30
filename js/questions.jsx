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

    userAnswer : null,

    advanceQuestion: function(event) {
        event.preventDefault();
        var userAnswer = this.userAnswer;
        console.log(userAnswer);
        if (userAnswer === this.props.questionInfo.correctAnswer){
          console.log('true');

          this.props.dispatch(actions.getQuestion(true));
        } else {
          this.props.dispatch(actions.getQuestion(false));
        }

    },
    onChange: function(event){
      console.log(event.target.value);
      this.userAnswer = event.target.value;
    }
    ,
    render: function() {
        var questionInfo = this.props.questionInfo;
        return (
            <div className="questions">
                <h1>{questionInfo.questionText}</h1>
                <div className="choices">
                    <form onSubmit={this.advanceQuestion} name="choices">
                        <input type="radio" name="choices" id="r1" ref="answer" onChange={this.onChange} value={questionInfo.answers[0]}/>
                        <label for="r1">{questionInfo.answers[0]}</label>
                        <input type="radio" name="choices" id="r2"  ref="answer" onChange={this.onChange}  value={questionInfo.answers[1]}/>
                        <label for="r2">{questionInfo.answers[1]}</label>
                        <input type="radio" name="choices" id="r3"  ref="answer" onChange={this.onChange}  value={questionInfo.answers[2]}/>
                        <label for="r3">{questionInfo.answers[2]}</label>
                        <input type="radio" name="choices" id="r4"  ref="answer" onChange={this.onChange}  value={questionInfo.answers[3]}/>
                        <label for="r4">{questionInfo.answers[3]}</label>
                          <button type="submit" name="choices" className="submitButton">Submit Answer</button>

                    </form>
                </div>
            </div>
        );
    }

});


var mapStateToProps = function(state, props) {
    console.log(state);

    var question = state.question[state.question.length - 1];
    return {questionInfo: question};
};

var Container = connect(mapStateToProps)(Question);

module.exports = Container;
