var React = require('react');
var ReactDOM = require('ReactDOM');

var Questions = React.createClass({
    render() {
        return (
                    <div className="questions">
                        // How do you say hello in Samoan?
                    </div>
        );
    }

});

var Choices = React.createClass({
    render() {
        return (
            <div className="choices">
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

exports.Questions = Questions;
exports.Choices = Choices;
