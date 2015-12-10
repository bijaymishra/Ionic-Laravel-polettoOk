// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var uver = angular.module('uver', ['ionic','angular-cache','ngCordova','ngMap','uver.config']);
uver.config(function (CacheFactoryProvider) {
    angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
  });

uver.run(function($state,$rootScope,$ionicPlatform,$ionicPopup,$ionicHistory,CacheFactory,geolocationService) {
    
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){ 
               if (toState.name.indexOf('login') > -1) {
                // If logged out and transitioning to a logged in page:
                var isLogin = localStorage.getItem('isLogin');
                alert(isLogin);
                if (isLogin !== 'undefined' && isLogin !== null) {
                    event.preventDefault();
                    $state.go('app.profile');
                }
              }  
            //else if (toState.name.indexOf('public') > -1 && $cookies.Session) {
            //    // If logged in and transitioning to a logged out page:
            //    e.preventDefault();
            //    $state.go('tool.suggestions');
            //};
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
     geolocationService.getPosition()
    .then(function(position) {
       $rootScope.Latitude =position.coords.latitude;
         $rootScope.longitude =position.coords.longitude;
    }, function(err) {
      var myPopup = $ionicPopup.show({
                     // template: '',
                     // title: 'Terms',
                     subTitle: "We cannot determine your location. To fix this, go to Location Settings and turn on location services for the PolettoOk app and restart.",
                     buttons: [{ text: 'Close' }]
                 });
    });
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
