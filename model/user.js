var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  googleID: {type: String, index: true},
  fullName: String,
  firstName: String,
  accessToken: String,
  deck: [{
    questionId: String,
    m: Number
  }]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
