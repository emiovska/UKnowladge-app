myApp.controller('showResultController', ['$scope','$interval', function($scope, $interval) {
    $scope.value = 0;
    $scope.upperLimit = 10;
    $scope.lowerLimit = 0;
    $scope.unit = "UKnow";
    $scope.precision = 2;
    $scope.ranges = [
        {
            min: 0,
            max: 4,
            color: '#DEDEDE'
        },
        {
            min: 4,
            max: 6,
            color: '#8DCA2F'
        },
        {
            min: 6,
            max: 8,
            color: '#FF7700'
        },
        {
            min: 8,
            max: 10,
            color: '#C50200'
        }
    ];
    var c=6*20;
    var interval = $interval(function(){
        $scope.value+=0.05;
        c--;

        if(c==0) {
            $interval.cancel(interval);
            console.log("stop...");
        }

    },50);


}]);