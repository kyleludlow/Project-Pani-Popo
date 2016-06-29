var React = require('react');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;

var Questions = React.createClass({
    render: function() {
        return (
                    <div className="questions">

                    </div>
        );
    }

});

var Choices = React.createClass({
    render() {
        return (
            <div className="choices">
                <form>

                </form>
                <button type="submit" class="submitButton">Submit Answer
                </button>
            </div>
        );
    }

});

exports.Questions = Questions;
exports.Choices = Choices;
