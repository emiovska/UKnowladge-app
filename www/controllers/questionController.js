myApp.controller('questionController', ['$scope','$stateParams','FirebaseData', function($scope, $stateParams,FirebaseData) {

    var technologyId = $stateParams.technologyId;
    var questions = [];
    if(technologyId) {
            var technologyProps = FirebaseData.technologyQuestions(technologyId);

        technologyProps.$loaded().then(function(props) {
                questions= technologyProps.questions;
                $scope.currentQuestionIndex = 0;
                $scope.question = questions[$scope.currentQuestionIndex];
                $scope.question.technologyLogo = technologyProps.picture;

            });
    }

    $scope.previousQuestions = function() {
        $scope.currentQuestionIndex--;
        $scope.question = questions[$scope.currentQuestionIndex];
    };

    $scope.nextQuestion = function() {
        $scope.currentQuestionIndex++;
        $scope.question = questions[ $scope.currentQuestionIndex];
    }

}]);