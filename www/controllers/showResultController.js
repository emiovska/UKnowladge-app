myApp.controller('showResultController', ['$scope','$interval','$stateParams','SharedData','$cordovaSocialSharing',
        function($scope,$interval,$stateParams,SharedData,$cordovaSocialSharing) {



    $scope.value = 0;
    $scope.upperLimit = 10;
    $scope.lowerLimit = 0;
    $scope.unit = "UKnow";
    $scope.precision = 2;
    $scope.ranges = [
        {
            min: 0,
            max: 2,
            color: '#DEDEDE'
        },
        {
            min: 2,
            max: 4,
            color: '#76FF03'
        },
        {
            min: 4,
            max: 6,
            color: '#FFEB3B'
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

    var c=$stateParams.correct*20;
    var interval = $interval(function(){
        $scope.value+=0.05;
        c--;

        if(c<=0) {
            $interval.cancel(interval);
            $scope.result = $stateParams.correct*10 + "%";
            console.log("stop...");
        }

    },50);


    $scope.shareOnFacebook = function() {
        $cordovaSocialSharing
            .shareViaFacebook("hello from ngCordova", null ,"https://uknowladge.firebaseio.com/java-hibernate/picture")
            .then(function(result) {
                // Success!
                alert("success");
            }, function(err) {
                // An error occurred. Show a message to the user
                alert("errot");
            });
    }


      $scope.toImage = function() {

          var imageData= makeImageData();
         // $('#binaryImage').attr('src', imageData);

          //console.log("tukaa");
          $cordovaSocialSharing
              .shareViaFacebook("hello from ngCordova", imageData,"")
              .then(function(result) {
                  // Success!
                  alert("success");
              }, function(err) {
                  // An error occurred. Show a message to the user
                  alert(img);
              });
      };




       var makeImageData = function() {
           var svg = document.getElementById('chart').innerHTML;
           var canvas = document.getElementById("canvas");
           canvg(canvas, svg);
           var w = canvas.width;
           var h = canvas.height;
           var context = canvas.getContext('2d');
           var data = context.getImageData(0, 0, w, h);
           var compositeOperation = context.globalCompositeOperation;
           context.globalCompositeOperation = "destination-over";
           context.fillStyle = "white";
           context.fillRect(0,0,w,h);

           var imageData = canvas.toDataURL("image/png",1);
           context.clearRect (0,0,w,h);

           context.putImageData(data, 0,0);
           context.globalCompositeOperation = compositeOperation;

           return imageData;
       }

}]);