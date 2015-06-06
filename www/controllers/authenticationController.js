myApp.controller('authenticationController', ['$scope','AuthService','$location', function($scope,AuthService,$location) {

        $scope.logOut = function() {
            AuthService.logOutUser();
            $location.path('/authentication')
        }

}]);