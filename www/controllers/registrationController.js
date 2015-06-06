myApp.controller('registrationController', ['$scope','AuthService','$location', function($scope,AuthService,$location) {

        $scope.signUp  = function(name,mail,password) {

            var signUpStatus= AuthService.createUser(name,mail,password);
            $location.path("/intro");

        }
}]);