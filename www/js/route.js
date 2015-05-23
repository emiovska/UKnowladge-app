myApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
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
        })
        .state('showResult',{
            url: "/showResult/:correct",
            templateUrl: "views/showResult.html",
            controller: 'showResultController'
        })
        .state('summary',{
            url: "/summary",
            templateUrl: "views/summary.html",
            controller: 'summaryController'
        });

    $urlRouterProvider.otherwise('/intro');
});