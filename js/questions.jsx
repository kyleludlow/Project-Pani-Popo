var React = require('react');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var Link = require('react-router').Link;
var store = require('../redux/store.js');
var actions = require('../redux/actions.js');
var connect = require('react-redux').connect;
import {RadioGroup, Radio} from 'react-radio-group';

var Question = React.createClass({

  getInitialState: function() {
    return {userAnswer: 'apple'};
  },

  handleChange: function(value) {

    this.setState({userAnswer: value});
    console.log(this.state);
  },

  submitAnswer: function(event) {
    event.preventDefault();
    var userAnswer = this.state.userAnswer;
    this.props.dispatch(actions.makeGuess(userAnswer));
  },
    render: function() {
        var questionInfo = this.props.questionInfo;
        return (
            <div className="questions">
                <h1>{questionInfo.questionText}</h1>
                <div className="choices">
                    <form onSubmit={this.submitAnswer} name="choices">
                      <RadioGroup name="choices" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
                        <Radio value={questionInfo.answers[0]}/>{questionInfo.answers[0]}
                        <Radio value={questionInfo.answers[1]}/>{questionInfo.answers[1]}
                        <Radio value={questionInfo.answers[2]}/>{questionInfo.answers[2]}
                        <Radio value={questionInfo.answers[3]}/>{questionInfo.answers[3]}
                      </RadioGroup>

                          <button type="submit" name="choices" className="submitButton">Submit Answer</button>

                    </form>
                </div>
            </div>
        );
    }

});

//
// <input type="radio" name="choices" id="r1" ref="answer" onChange={this.onChange} value={questionInfo.answers[0]}/>
// <label for="r1">{questionInfo.answers[0]}</label>
// <input type="radio" name="choices" id="r2"  ref="answer" onChange={this.onChange}  value={questionInfo.answers[1]}/>
// <label for="r2">{questionInfo.answers[1]}</label>
// <input type="radio" name="choices" id="r3"  ref="answer" onChange={this.onChange}  value={questionInfo.answers[2]}/>
// <label for="r3">{questionInfo.answers[2]}</label>
// <input type="radio" name="choices" id="r4"  ref="answer" onChange={this.onChange}  value={questionInfo.answers[3]}/>
// <label for="r4">{questionInfo.answers[3]}</label>
//


var mapStateToProps = function(state, props) {
    console.log(state);

    var question = state.question[state.question.length - 1];
    return {questionInfo: question};
};

var Container = connect(mapStateToProps)(Question);

module.exports = Container;
