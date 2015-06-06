myApp.controller('loginController', ['$scope','AuthService','$location', function($scope, AuthService,$location) {

        $scope.login  = function(mail,password) {

            AuthService.logUser(mail,password).then(function(){
                    $location.path('/intro');
            },function(error){

                $scope.data = {
                    errorShow: true
                }
               $scope.errorMessage = error.message;
              // $scope.$apply();
            })

        }
}]);