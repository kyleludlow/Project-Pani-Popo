require('./db/connect');
var express = require('express');
var bodyParser = require('body-parser');
var questionRoutes = require('./routes/question');
var userRoutes = require('./routes/user');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
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

app.listen(3000, function() {
    console.log('Running on port 3000');
});

exports.app = app;
