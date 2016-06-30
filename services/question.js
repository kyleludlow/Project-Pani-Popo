var Question = require('../model/question');

exports.save = function(question, callback, errback) {
    Question.create({
        question: question
    }, function(err, question) {
        if (err) {
            errback(err);
            return;
        }
        callback(question);
    });
};

exports.list = function(callback, errback) {
    Question.find(function(err, questions) {
        if (err) {
            errback(err);
            return;
        }
        callback(questions);
    });
};

exports.findOne = function(callback, errback) {
  Question.findOne({question: question}, 'question', function(err,user) {
    if (err) {
      errback(err);
      return
    }
    callback(question);
  })
}
