var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  deck: [{
    questionId: String,
    m: Number
  }]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
