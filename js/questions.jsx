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

    render: function() {
        var questionInfo = this.props.questionInfo;
        return (
                    <div className="questions">
                    <h1>{questionInfo.questionText}</h1>
                        <div className="choices">
                            <form>
                                <input type="radio" name="choices" value="choice-1"> {questionInfo.answers[0]}</input>
                                <input type="radio" name="choices" value="choice-2"/> {questionInfo.answers[1]}</input>
                                <input type="radio" name="choices" value="choice-3"/> {questionInfo.answers[2]}</input>
                                <input type="radio" name="choices" value="choice-4"/> {questionInfo.answers[3]}</input>
                            </form>
                            <button type="submit" class="submitButton">Submit Answer
                            </button>
                        </div>
                    </div>
        );
    }

});

var mapStateToProps = function(state, props) {
  return {
    questionInfo: state
  };
};

var Container = connect(mapStateToProps)(Question);

module.exports = Container;
