require('./connect');

var User = require('../model/user');
var mongoose = require('mongoose');

User.create({
  firstName: 'Bob',
  lastName: 'Doe',
  email: 'bobdoe@abc.com',
  password: 'bobdoe123'
}, function(err) {
  if (err) {
    console.log('THE ERROR:', err);
    return;
  }
  mongoose.disconnect();
});
