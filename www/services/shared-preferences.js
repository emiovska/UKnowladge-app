myApp.factory('SharedData', function () {

   // var questions= [];
    var questionsCheckedAnswers = {};
    var correctAnswers=0;
    var numberOfCorrectAnswers=0;

    return {
        //storeQuestions: function(ques) {
        //    questions = ques;
        //},
        //getQuestions: function() {
        //    return questions;
        //},
        storeQuestionsCheckedAnswers: function(questionsCheckedAns) {
            questionsCheckedAnswers=questionsCheckedAns;
        },
        getQuestionsCheckedAnswers: function() {
          return questionsCheckedAnswers;
        },
        storeCorrectAnswers: function(correct) {
            correctAnswers = correct;
        },
        getCorrectAnswers: function(){
            return correctAnswers;
        },
        storeNumOfCorrectAns: function(number){
            numberOfCorrectAnswers=number;
        },
        getNumOfCorrectAns: function(){
            return numberOfCorrectAnswers;
        }
    }
});