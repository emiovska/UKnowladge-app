myApp.controller("technologiesController", ['$scope','FirebaseData', function($scope, FirebaseData){
        $scope.showSpinner=true;
        var allTech = FirebaseData.technologies();

        allTech.$loaded().then(function(){
            $scope.showSpinner = false;
            $scope.technologies=allTech;
        });






}]);