// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'ngCordovaOauth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('ExampleCtrl', ['$scope', '$cordovaOauth', '$http', function($scope, $cordovaOauth, $http){
  $scope.googleLogin = function(){
    $cordovaOauth.google("589066861537-6tlold0mp9qbi9skg3m773k5du8q1f88.apps.googleusercontent.com", 
      ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email", 
      "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/plus.me"]).
    then(function(result){
      console.log("google login success");
      var accessToken;
      //$location.url('/scan');
      console.log(JSON.stringify(result));
      accessToken = JSON.stringify(result);
      console.log(result.access_token);
      console.log(typeof(result.access_token));

      //getting profile info of the user
      $http({method:"GET", url:"https://www.googleapis.com/plus/v1/people/me?access_token="+result.access_token}).
      success(function(response){
               console.log(response);
              var param = {
                provider: 'google',
                  google: {
                                uid: response["id"],
                                provider: 'google',
                                first_name: response["name"]["givenName"],
                                last_name: response["name"]["familyName"],
                                email: response.emails[0]["value"],
                                image: response.image.url
                            }
                };
                console.log(param);
      }, function(error) {
      console.log(error);
    });

  }, function(error){
    console.log(error);
  });
}
  
}])