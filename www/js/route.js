myApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('intro',{
            url: "/intro",
            templateUrl: "views/intro.html",
            controller: 'introController'
        })
        .state('login',{
            url: "/login",
            templateUrl: "views/login.html",
            controller: 'loginController'
        })
        .state('registration',{
            url: "/registration",
            templateUrl: "views/registration.html",
            controller: 'registrationController'
        })
        .state('authentication',{
            url: "/authentication",
            templateUrl: "views/authentication.html",
            controller: 'authenticationController'
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
            url: "/showResult/:correct/:time",
            cache: false,
            templateUrl: "views/showResult.html",
            controller: 'showResultController'
        })
        .state('summary',{
            url: "/summary",
            cache: false,
            templateUrl: "views/summary.html",
            controller: 'summaryController'
        })
        .state('companies',{
             url: "/companies",
             cache: false,
             templateUrl: "views/companies.html",
             controller: 'companiesController'
        });



    $urlRouterProvider.otherwise('/intro');
});