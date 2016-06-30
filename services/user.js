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

exports.findOne = function(userId, callback, errback) {
  User.findOne({_id: userId}, function(err, user) {
    if (err) {
      errback(err);
      return;
    }
    callback(user);
  });
};

exports.updateUserDeck = function(userId, deck, callback, errback) {
  var query = {
    _id: userId
  };
  var update = {
    deck: deck
  };
  User.findOneAndUpdate(query, update, function(err, question) {
    if (err) {
      errback(err);
      return;
    }
    callback(question);
  })
};

exports.delete = function(id, callback, errback) {
  var query = {
    _id: id
  };
  User.findByIdandRemove(query, function(err, user) {
    if (err) {
      errback(err);
      return;
    }
    callback(user);
  });
};
