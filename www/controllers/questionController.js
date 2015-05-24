myApp.controller('questionController', ['$scope','$rootScope','$stateParams','$ionicHistory','$location','$timeout','FirebaseData','SharedData','$cordovaDeviceMotion','$ionicSlideBoxDelegate',
    function($scope,$rootScope, $stateParams,$ionicHistory,$location,$timeout,FirebaseData,SharedData,$cordovaDeviceMotion,$ionicSlideBoxDelegate) {

    var technologyId = $stateParams.technologyId;
    var questions = [];
    var questionsCheckedAnswers = {};

    $rootScope.questions={};
    $scope.delay=true;

    $scope.currentQuestionIndex = 0;

    if(technologyId) {
        var technologyQuestions = FirebaseData.technologyQuestions(technologyId);
        technologyQuestions.$loaded().then(function(props) {
                questions= technologyQuestions;
                $rootScope.questions = questions;
                populateQuestionsCheckedAnswers(questions);


            $timeout(function(){
                $scope.delay=false;
                $ionicSlideBoxDelegate.update();
            },2000);

        });

    }

    $scope.speakQuestion = function(questionText) {
        texttospeech.speak(questionText);
    };

    $scope.nextQuestion = function() {
        $ionicSlideBoxDelegate.next();
    };

     $scope.previousQuestions = function() {
         $ionicSlideBoxDelegate.previous();
     }

    $scope.voiceAnswer = function() {
        var maxMatches = 5;
        var promptString = "Speak now"; // optional
        var language = "en-US";                     // optional
        window.plugins.speechrecognizer.startRecognize(function(result){
           var currentQuestion = questions[$scope.currentQuestionIndex];
           var answers = currentQuestion.answers;
           var recognizedAnswers = result;
           var founded=false;
           for(var i=0 ; i< recognizedAnswers.length ;i++) {
                if(founded) break;
                for(var j=0;j<answers.length;j++) {
                    var answer = answers[j].text.trim().toLowerCase();
                    var recognizedAnswer = recognizedAnswers[i].trim().toLowerCase();
                    if(answer === recognizedAnswer) {
                        checkedRecognizedAnswer(answers[j].id);
                        founded=true;
                        alert(answer);
                        break;
                    }
                }
           }

           if(!founded) {
               alert("Sorry I can't recognize your answer. Please try again");
           }
        }, function(errorMessage){
            alert("Error message: " + errorMessage);
        }, maxMatches, promptString, language);
    };

    $scope.checkAnswer = function(index,answerId){
        var currentQuestionId=index;
        var answers = questionsCheckedAnswers[currentQuestionId];
        return answers[answerId];
    }

    $scope.changeCheckedAnswer = function(index,answerId) {

       changeCheckedAnswers(index,answerId);
    };

    $scope.prepareResults = function() {

        SharedData.storeQuestionsCheckedAnswers(questionsCheckedAnswers);

        calculateCorrectAnswers(function(correct){

            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $location.path('/showResult/' + correct);
        });

    };

    var calculateCorrectAnswers = function(redirect) {
        var correct=0;
        var test= "";
        for(var i=0;i<10;i++) {
            var question = questions[i];
            var correctAnswer = question.correct;

            test += i+" "+ correctAnswer + "\n";
            if(questionsCheckedAnswers[i][correctAnswer]) {
                correct++;
            }
        }
       redirect(correct);
    };

    var changeCheckedAnswers = function(index,answerId) {
        var currentQuestionId=index
        togglequestionCheckedAnswers(currentQuestionId);
        questionsCheckedAnswers[currentQuestionId][answerId]= true;

    }
    var populateQuestionsCheckedAnswers = function(questions) {
        questions.forEach(function(question, index){
            var answers = question.answers;
            var checkedAnswers = {};
            angular.forEach(answers, function(answer){
                checkedAnswers[answer.id] = false;
            });
            questionsCheckedAnswers[index] = checkedAnswers;
        });
    };

    var checkedRecognizedAnswer = function(answerId) {
        changeCheckedAnswers(answerId);
        $scope.$apply();
    };


    var togglequestionCheckedAnswers = function(questionId) {
        var checkedAnswers = questionsCheckedAnswers[questionId];
        angular.forEach(checkedAnswers, function(value, key){
            checkedAnswers[key] = false;
        });
        questionsCheckedAnswers[questionId]= checkedAnswers;
    };


   //var options = { frequency: 80 };
   //var watch = $cordovaDeviceMotion.watchAcceleration(options);
   //     watch.then(
   //         null,
   //         function(error) {
   //             // An error occurred
   //         },
   //         function(result) {
   //             var Z = result.z;
   //
   //             if(Z>=18 ) {
   //                 if($scope.currentQuestionIndex<=8)
   //                      $scope.nextQuestion();
   //             }
   //
   //
   //         });
   //
   //    // watch.clearWatch();
   //     // OR
   //     //$cordovaDeviceMotion.clearWatch(watch)
   //     //    .then(function(result) {
   //     //        // success
   //     //    }, function (error) {
   //     //        // error
   //     //    });
   //
   //// }, false);


        $scope.slideHasChanged = function(index) {
            $scope.currentQuestionIndex = index;

        }


}]);