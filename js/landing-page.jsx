var React = require('react');
var ReactDOM = require('ReactDOM');

var LandingPage = React.createClass({

    render() {
        return (
            <div className="landingPage">
            <h1>AFO MAI!</h1>
            <h1>Welcome to Samoan Koans!</h1>
            <h1>The smartest way to learn Samoan!</h1>
            <img src="" alt="SOME SAMOAN IMAGE" className="loginImage">
            <div className="login">
                <div className="loginFields">
                    <input type="text" placeholder="Enter Your Username">
                    <input type="text" placeholder="Enter Your Password">
                </div>
                <button type="submit" className="loginButton">Login
                </button>
                <a href="">Don't Have an Account? <br> Click Here to Signup!</a>
                <button type="submit" className="googleLoginButton">Login with Google</button>
                <a href="">Don't have a Gmail Account? <br> Click Here to SignUp for GMail!</a>
            </div>
        </div>

        );
    }

});


module.exports = LandingPage;
