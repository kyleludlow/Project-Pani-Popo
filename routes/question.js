var express = require('express');
var router = express.Router();
var Question = require('../services/question');
var questionArray = require('../db/questions');


router.post('/questions', function(req, res) {
  var card = questionArray[0];

  console.log('direct hit');
  if (req.body.correct === true){

    console.log('its true');

    questionArray.shift();
    questionArray.splice(4, 0, card);
    //remove first item of array
    //splice that question up the list by 4
  } else if (req.body.correct === false) {
    console.log('ive been hit!');

    questionArray.shift();
    questionArray.splice(2, 0, card);
    //remove first item of array
    // splice that question up 2
  }
  res.json(questionArray[0]);
  // }, function(err) {
  //     res.status(400).json(err);
  // });
});

// router.get('/questions', function(req, res) {
//   Question.findOne(req.params.question, function(question) {
//     res.json(question);
//   }, function(err) {
//       res.status(400).json(err);
//   });
// });

module.exports = router;
