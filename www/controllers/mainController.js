myApp.controller('mainController', ['$scope', function($scope) {


   var test=false;

   $scope.toggleStartStop= function(){
        var maxMatches = 5;
        var promptString = "Speak now"; // optional
        var language = "en-US";                     // optional
        window.plugins.speechrecognizer.startRecognize(function(result){
            alert(result);
            test=true;
            $scope.$apply()
        }, function(errorMessage){
            console.log("Error message: " + errorMessage);
        }, maxMatches, promptString, language);


   };

    $scope.speakQuestion= function(){
        texttospeech.speak('Challenge your knowledge');
    }


   $scope.first=function() {
        return test;
   }





}]);