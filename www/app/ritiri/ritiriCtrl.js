(function () {
    'use strict';

    angular.module('uver').controller('ritiriCtrl', ['$scope','$rootScope','$location','$http','$state','$timeout','serviceApi','GENERAL_CONFIG','ritiri','applicationLocalStorageService',ritiriCtrl]);

    function ritiriCtrl($scope,$rootScope,$location,$http, $state, $timeout,serviceApi,GENERAL_CONFIG,ritiri,applicationLocalStorageService) {
    	
        
          console.log($rootScope.loginUsers[0].id + "jhjhjh");
          $scope.currentuserID = $rootScope.loginUsers[0].id;

       $scope.getRitiriDB = function() {
 
    ritiri.ritirilist(function(ritirisumaary) {
      $scope.ritiri =  ritirisumaary;
      applicationLocalStorageService.storeCache('RitiriData', ritirisumaary);
      console.log($scope.ritiri);
    });
     
  };
  
  if (!applicationLocalStorageService.checkKey('RitiriData')) {
             $scope.getRitiriDB();
        }else{
          $scope.ritiri = applicationLocalStorageService.getCache('RitiriData');
        }

  $scope.refreshRitiri = function() {

    console.log('Refreshing');
    $scope.getRitiriDB();

    $timeout(function() {
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.refreshComplete');
    }, 1250);
  };
  
  $scope.ritiriview = function(itemId){
    var result ={retriId:itemId};
          $state.go('app.ritirilx',result);
      };

      //consegna implemantation
  
      

       $scope.ritirieff = function(itemId){
        ritiri.find(itemId, function(ritiriDetail) {
          $rootScope.ritiriID = ritiriDetail.id_ritiro;
          });
                 $location.path('/app/ritira');
          
        
      };
      $scope.mancatiritiri = function(itemId){
          ritiri.find(itemId, function(ritiriDetail) {
          $rootScope.ritiriID = ritiriDetail.id_ritiro;
          });
                 $location.path('/app/rifiuta');
          
        
      };
          
  
}


})();
