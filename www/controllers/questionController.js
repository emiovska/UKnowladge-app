myApp.controller('questionController', ['$scope','$stateParams','FirebaseData','$cordovaDeviceMotion', function($scope, $stateParams,FirebaseData,$cordovaDeviceMotion) {

    var technologyId = $stateParams.technologyId;
    var questions = [];
    var questionsCheckedAnswers = {};
    if(technologyId) {
        var technologyQuestions = FirebaseData.technologyQuestions(technologyId);
        technologyQuestions.$loaded().then(function(props) {
                questions= technologyQuestions;
                populateQuestionsCheckedAnswers(questions);
                $scope.currentQuestionIndex = 0;
                $scope.question = questions[$scope.currentQuestionIndex];
        });

        var logo = FirebaseData.technologyLogo(technologyId);
        logo.$loaded().then(function(logoUrl){
            $scope.question.technologyLogo = logoUrl.$value;
        })
    }

    $scope.previousQuestions = function() {
        if($scope.currentQuestionIndex >0) {
            $scope.currentQuestionIndex--;
            $scope.question = questions[$scope.currentQuestionIndex];
        }
    };

    $scope.nextQuestion = function() {
        if($scope.currentQuestionIndex <9) {
            $scope.currentQuestionIndex++;
            $scope.question = questions[$scope.currentQuestionIndex];
        }
    };

    $scope.speakQuestion = function(questionText) {
        texttospeech.speak(questionText);
    };

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

    $scope.checkAnswer = function(answerId){
        var currentQuestionId=$scope.currentQuestionIndex;
        var answers = questionsCheckedAnswers[currentQuestionId];
        return answers[answerId];
    }

    $scope.changeCheckedAnswer = function(answerId) {
       changeCheckedAnswers(answerId);
    };

    $scope.calculateCorrectAnswers = function() {
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

        alert(test);
        $scope.correct=correct;

    };


    var changeCheckedAnswers = function(answerId) {
        var currentQuestionId=$scope.currentQuestionIndex;
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


   // var options = { frequency: 80 };
   // var watch = $cordovaDeviceMotion.watchAcceleration(options);
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



}]);