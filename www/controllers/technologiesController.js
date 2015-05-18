myApp.controller("technologiesController", ['$scope','FirebaseData', function($scope, FirebaseData){

        var allTech = FirebaseData.technologies();
        $scope.technologies=allTech;

}]);