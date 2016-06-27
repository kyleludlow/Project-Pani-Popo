require('../db/connect');
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

//TODO: get actual file names when done with models
var User = require('../model/user');
var Question = require('../model/question');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

mongoose.connection.on('error', console.error.bind(console, 'CONNECTION ERROR MESSAGE:'));
mongoose.connection.once('open', function() {
  console.log('DB CONNECTION SUCCESSFUL');
});

app.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json('i am a user');
  })
})