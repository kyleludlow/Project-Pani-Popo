var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: {
    firstName: String,
    lastName: String
  },
  email: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
