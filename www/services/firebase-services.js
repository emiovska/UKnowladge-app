/**
 * Created by ElenaM on 17.05.2015.
 */
myApp.factory('FirebaseData', function ($firebase) {
    var firebaseUrl = "https://uknowladge.firebaseio.com/";


    return {
        technologies: function() {
           var firebaseRef = new Firebase(firebaseUrl).limit(7);
           var allTechbologies = $firebase(firebaseRef).$asArray();
           return allTechbologies;
        },
        technologyQuestions: function(technologyId) {
           var questionsUrl = firebaseUrl + technologyId + "/questions/";
           var questionsRef= new Firebase(questionsUrl).limit(10);
           var questions = $firebase(questionsRef).$asArray();

            return questions;
        },

        technologyLogo: function(technologyId) {
            var pictureUrl = firebaseUrl + technologyId + "/picture/";
            var pictureRef= new Firebase(pictureUrl);
            var picture = $firebase(pictureRef).$asObject();

            return picture;
        }
    }
});
