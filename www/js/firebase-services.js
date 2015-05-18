/**
 * Created by ElenaM on 17.05.2015.
 */
myApp.factory('FirebaseData', function ($firebase) {
    var firebaseUrl = "https://uknowladge.firebaseio.com/";
    var firebaseRef = new Firebase(firebaseUrl);

    return {
        technologies: function() {
            var allTechbologies = $firebase(firebaseRef).$asArray();
           return allTechbologies;
        },
        technologyQuestions: function(technologyId) {
           var questionsUrl = firebaseUrl + technologyId;
           var questionsRef= new Firebase(questionsUrl)
           var questions = $firebase(questionsRef).$asObject();

            return questions;
        }
    }
});
