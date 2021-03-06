myApp.controller('summaryController', ['$scope','$rootScope','$ionicPopup','SharedData','$stateParams',
 function($scope,$rootScope,$ionicPopup,SharedData,$stateParams) {

    var questionsCheckedAnswers = SharedData.getQuestionsCheckedAnswers();
    var numberOfCorrect = SharedData.getNumOfCorrectAns();

    if(numberOfCorrect > 2)
        $scope.suggestions=true;
    else
        $scope.suggestions=false;

    $scope.correctQuestion = function(index) {

        var question = $rootScope.questions[index];
        console.log(questionsCheckedAnswers[index][question.correct]);
        return questionsCheckedAnswers[index][question.correct] == true;

    };

    $scope.showCorrectAnswer = function(index) {

        var question = $rootScope.questions[index];

        var correctAnswer = question.answers[question.correct].text;
        var alertPopup = $ionicPopup.alert({
            title: 'Correct answer',
            template: correctAnswer
        });
        alertPopup.then(function(res) {
            console.log('Correct answer');
        });
    };




}]);