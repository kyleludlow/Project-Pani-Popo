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

  radioChange: function(value) {

    this.setState({userAnswer: value});
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
                      <RadioGroup name="choices" selectedValue={this.state.selectedValue} onChange={this.radioChange}>
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


function select(state) {
  console.log('i got fired');
  return state.question[state.question.length - 1].userAnswer;
};

let currentValue
function handleChange() {
  let previousValue = currentValue
  currentValue = select(store.getState())
console.log('im previous:  ' +  previousValue );
  if (previousValue !== currentValue && previousValue !== undefined) {
    console.log('Some deep nested property changed from', previousValue, 'to', currentValue)
    store.dispatch(actions.getQuestion({answer: 'true'}));
  }
};
let unsubscribe = store.subscribe(handleChange);





var mapStateToProps = function(state, props) {
    console.log(state);

    var question = state.question[state.question.length - 1];
    return {questionInfo: question};
};

var Container = connect(mapStateToProps)(Question);



module.exports = Container;
