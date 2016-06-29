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
        return (
                    <div className="questions">
                        <div className="choices">
                            <form>
                                <input type="radio" name="choices" value="choice-1"> Bonjour
                                <br>
                                <input type="radio" name="choices" value="choice-2"> Talofa
                                <br>
                                <input type="radio" name="choices" value="choice-3"> Como Estas?
                                <br>
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
    samoankoans: state
  };
};

var Container = connect(mapStateToProps)(Question);

module.exports = Container;
