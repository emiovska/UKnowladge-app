myApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('intro',{
            url: "/intro",
            templateUrl: "views/intro.html",
            controller: 'introController'
        })
        .state('question',{
            url: "/question/:technologyId",
            cache: false,
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
            cache: false,
            templateUrl: "views/showResult.html",
            controller: 'showResultController'
        })
        .state('summary',{
            url: "/summary",
            cache: false,
            templateUrl: "views/summary.html",
            controller: 'summaryController'
        });

    $urlRouterProvider.otherwise('/intro');
});