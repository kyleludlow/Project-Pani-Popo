require('./db/connect');
var express = require('express');
var bodyParser = require('body-parser');
var questionRoutes = require('./routes/question');
var userRoutes = require('./routes/user');
var app = express();

var passport = require('passport');
var flash = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

require('../routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport



app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static('public'));

app.use('/', questionRoutes);
app.use('/', userRoutes);
app.use('*', function(req, res) {
  res.status(404).json({
    message: 'Not Found'
  });
});

//passport stuff

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.listen(3000, function() {
    console.log('Running on port 3000');
});

exports.app = app;
