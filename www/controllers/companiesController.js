myApp.controller('companiesController', ['$scope','$cordovaInAppBrowser', function($scope,$cordovaInAppBrowser) {

    $scope.companies=[
    {
        name: "Web Factory",
        website: "http://webfactory.mk",
        pictureUrl: "https://crunchbase-production-res.cloudinary.com/image/upload/c_pad,h_98,w_98/v1397189464/6e01bbaf3f4e2ea4dbc2f87ee4b4703a.png"
    },
    {
            name: "3P Development",
            website: "http://3pdevelopment.mk",
            pictureUrl: "https://media.licdn.com/media/p/2/005/02c/1ff/2a735b5.png"
        },

    ]

    $scope.visitSite = function(index) {

        var websiteUrl = $scope.companies[index].website;
        $cordovaInAppBrowser.open(websiteUrl, '_blank')
              .then(function(event) {
                // success
              })
              .catch(function(event) {
                // error
              });

    }



}]);