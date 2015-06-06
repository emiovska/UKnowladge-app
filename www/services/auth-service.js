/**
 * Created by ElenaM on 17.05.2015.
 */
myApp.factory('AuthService', function AuthService($firebase,$q) {

    var firebaseUrl = "https://uknowladge.firebaseio.com/";
    var firbaseRef = new Firebase(firebaseUrl);

    return {
        getLoggedUser: function(){

            var def = $q.defer();

            firbaseRef.onAuth(function(authData){

                def.resolve(authData);
            });

            return def.promise;
        },

        createUser: function(fullName,mail,password){
        var message="Error: ";
            firbaseRef.createUser({
              email    : mail,
              password : password
            }, function(error, userData) {
              if (error) {
                this.message = error;
              } else {

              firbaseRef.authWithPassword({
                    email    : mail,
                    password : password
              }, function(error, authData) {
                    if (error) {
                      console.log("Login Failed!", error);
                    } else {
                      firbaseRef.child("users").child(authData.uid).set({
                             provider: authData.provider,
                             name: fullName,
                             mail: mail
                       });
                    }
              });


              }

            });

            return this.message;
        },

        logUser: function(mail, password){
            var def = $q.defer();
            firbaseRef.authWithPassword({
                                email    : mail,
                                password : password
                          }, function(error, authData) {
                                if (error) {
                                  def.reject(error);
                                } else {
                                   def.resolve("Successful logged user");
                                }
                          });

            return def.promise;
        },

        logOutUser: function(){
                firbaseRef.unauth()
        }

    }
});
