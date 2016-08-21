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
  User.findOne({googleID: userId}, function(err, user) {
    if (err) {
      errback(err);
      return;
    }
    callback(user);
  });
};

exports.findOneByGoogleId = function(googleId, callback, errback) {
  User.findOne({googleID: googleId}, function(err, user) {
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
    $set:{deck: deck}
  };
  User.findOneAndUpdate(query, update, {new: true}, function(err, user) {
    if (err) {
      console.log('err',err);
      errback(err);
      return;
    }
    console.log('user (newly persisted)', user);
    callback(user);
  });
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
