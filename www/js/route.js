myApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('speech', {
            url: "/speech",
            templateUrl: "views/speech.html",
            controller: 'mainController'
        })
        .state('intro',{
            url: "/intro",
            templateUrl: "views/intro.html",
            controller: 'introController'
        })
        .state('question',{
            url: "/question/:technologyId",
            templateUrl: "views/question.html",
            controller: 'questionController'
        })
        .state('technologies',{
            url: "/technologies",
            templateUrl: "views/technologies.html",
            controller: 'technologiesController'
        });;

    $urlRouterProvider.otherwise('/intro');
});