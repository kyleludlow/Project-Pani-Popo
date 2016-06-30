// var User = {
//   key: value,
//   sequence: ['array of questions'],
//   progress: {
//     full history: something,
//     perQuestion: [{questionId: 0,
//                     mValue: 1},
//                   {}]
//   }
// }


//Given a list of questions with corresponding "memory values", M, starting at 1:

// under question schema
var questions = [0, 1, 2, 3, 4, 5];


var question =  {
                  text: 'sdfsfs',
                  answer: answer,
                  options: [options]
};


// card schema should be (date, user, questions)


var card = {
            date: '3/12/2000',
            user: 'Kyle',
            deck: [{question: question_id,
                            m: 1
                              }]
};


deck: question_ id: question id,
                  m:



var cards = [{question: 0, m: 1}, {question: 1, m: 1}, {question: 2, m: 1}, {question: 3, m: 1}, {question: 4, m: 1}, {question: 5, m: 1} ];


// use run-auto to get card schemas for user data for statistics


//    Take the first question in the list
//    Ask the question
var serveQuestion = function(cardArray, questionArray){
  var questionIndex = cardArray[0].question;
  return questionArray[questionIndex];
};

// user gets answer correct

var correctUserAnswer = function(){
  return true;
};


// user gets answer wrong
var wrongUserAnswer = function(){
  return false;
};

//    If the answer was correct:
//        Double the value of M
//    If the answer was wrong:
//        Reset M to 1
var mHandling = function(questionResponse, card){
    var m = card.m;
    if (questionResponse === true){
      return m * 2;
    }
      else if (questionResponse === false){
    return  1;
    }
};


//    Move the question back M places in the list
var moveQuestion = function(cardArray, card, mHandling){
  var n = mHandling;
  console.log(n);
  var newArray = cards.splice(n, 0, card);
    console.log(newArray);
  return newArray;
};




cards = moveQuestion(cards, cards[0], mHandling(correctUserAnswer(), cards[0]));

console.log(cards);
