var User = require('../model/user');

exports.save = function(user, callback, errback) {
  var newUser = new User(user);
  User.create(
    newUser, function(err, user) {
    if (err) {
      errback(err);
      return;
    }
    callback(user);
  });
};

exports.list = function(callback, errback) {
  User.find(function(err, user) {
    if (err) {
      errback(err);
      return;
    }
    callback(user);
  });
};

exports.findOne = function(name, callback, errback) {
  User.findOne({name: name}, 'name', function(err, user) {
    if (err) {
      errback(err);
      return;
    }
    callback(user);
  });
};

exports.delete = function(id, callback, errback) {
  User.findByIdandRemove(id, function(err, user) {
    if (err) {
      errback(err);
      return;
    }
    callback(user);
  });
};
