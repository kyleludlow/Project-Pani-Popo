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
    return {userAnswer: null};
  },

  radioChange: function(value) {

    this.setState({userAnswer: value});
  },

  submitAnswer: function(event) {
    event.preventDefault();
    var userAnswer = this.state.userAnswer;
    this.props.dispatch(actions.makeGuess(userAnswer));
    this.setState({userAnswer: null});
  },

    render: function() {
      var questionInfo = this.props.questionInfo;
        return (
            <div className="questions">
                <h1>{questionInfo.questionText}</h1>
                <div className="choices">
                    <form onSubmit={this.submitAnswer} name="choices">
                      <RadioGroup name="choices" selectedValue={this.state.userAnswer} onChange={this.radioChange}>
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
  return state.question[state.question.length - 1].userAnswer;
};

function selectCorrectAnswer(state) {
  return state.question[state.question.length - 1].correctAnswer;
};



var currentUserAnswer;
function handleChange() {
  var correctAnswer = selectCorrectAnswer(store.getState());
  var previousUserAnswer = currentUserAnswer;
  currentUserAnswer = select(store.getState());


  if (previousUserAnswer !== currentUserAnswer && previousUserAnswer !== undefined && currentUserAnswer !== null) {
    if(currentUserAnswer === correctAnswer){
      store.dispatch(actions.getQuestion({answer: true}));
      store.dispatch(actions.makeGuess(null));
    } else {
      store.dispatch(actions.getQuestion({answer: false}));
      store.dispatch(actions.makeGuess(null));
    }

    }
};
var unsubscribe = store.subscribe(handleChange);


var mapStateToProps = function(state, props) {

    var question = state.question[state.question.length - 1];
    return {questionInfo: question};
};

var Container = connect(mapStateToProps)(Question);



module.exports = Container;
