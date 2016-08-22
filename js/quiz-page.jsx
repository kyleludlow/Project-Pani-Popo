var React = require('react');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var Link = require('react-router').Link;
var store = require('../redux/store.js');
var connect = require('react-redux').connect;

var userActions = require('../redux/actions/user');
var questionActions = require('../redux/actions/question');

var Question = require('./questions.jsx');

var QuizPage = React.createClass({
    render: function(){
        return (
            <div className="quizPage">
                <div className="questionSection">
                    <Question/>
                </div>
            </div>
        );
    }

});

var mapStateToProps = function(state, props) {
  return {
    samoankoans: state
  };
};

var Container = connect(mapStateToProps)(QuizPage);

module.exports = Container;
