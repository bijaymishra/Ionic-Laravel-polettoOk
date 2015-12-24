(function () {
    'use strict';

    angular.module('uver').controller('profileController', ['$scope','$rootScope','$http','$state','$interval','$ionicPopup','$location','serviceApi','geolocationService','GENERAL_CONFIG',profileController]);

    function profileController($scope,$rootScope,$http, $state,$interval,$ionicPopup,$location,serviceApi,geolocationService,GENERAL_CONFIG) {
    $rootScope.spedUpdate = false;
    $rootScope.ritiUpdate = false;
    var currentUser = localStorage.getItem('currentUser');
          //alert(currentUser);
          currentUser = JSON.parse(currentUser);
          console.log(currentUser);
          $scope.currentuserID = currentUser[0].id;
          if(currentUser[0].avatar != null){
          $scope.avatar = currentUser[0].avatar;
        }else{
          $scope.avatar = "1.jpg";
        }

     $interval(function (index) {
     geolocationService.getPosition()
    .then(function(position) {
       $rootScope.Latitude =position.coords.latitude;
         $rootScope.longitude =position.coords.longitude;
           var data ={
           
                "lat": position.coords.latitude,
                "long": position.coords.longitude,
                "entry_by" : $scope.currentuserID
            
            };
           
         serviceApi.updatelocation(data)
      .then(function (response) {
          if (response == '204') {
            console("please check your internet connection");
          }
          else {
            console("location updated");
          }
        });



    }, function(err) {
      var myPopup = $ionicPopup.show({
                     // template: '',
                     // title: 'Terms',
                     subTitle: "We cannot determine your location. To fix this, go to Location Settings and turn on location services for the PolettoOk app and restart.",
                     buttons: [{ text: 'Close' }]
                 });
    });
     }, 300000);

      //code to logout 

      $scope.logout = function(){
      localStorage.clear();
      $location.path('/login');
      }
}


})();
