// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var uver = angular.module('uver', ['ionic','angular-cache','ngCordova','ngMap','uver.config']);
uver.config(function (CacheFactoryProvider) {
    angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
  });

uver.run(function($state,$rootScope,$ionicPlatform,$ionicPopup,$interval,$ionicHistory,CacheFactory,geolocationService) {
    
    var protectedStates = ['app.login'];

$rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
     // See if state being transitioned needs to be access checked
     if (protectedStates.indexOf(toState.name) > -1) {
         var isLogin = localStorage.getItem('isLogin');
                //alert(isLogin);
                if (isLogin !== 'undefined' && isLogin !== null) {
              // Prevent the current state from being changed
              event.preventDefault();
              $state.go('app.profile');       // go to home page or login page.
         }
     }
});

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    // Check for network connection
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.alert({
          title: 'No Internet Connection',
          content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
        })
        .then(function(result) {
         
            ionic.Platform.exitApp();
          
        });
      }
    }
    
    $ionicPlatform.registerBackButtonAction(function (event) {
    
        if($ionicHistory.currentStateName() == "app.profile"){
                ionic.Platform.exitApp();
          // or do nothing
         }
        else {
          $ionicHistory.goBack();
        }
      }, 100);
  });
})
