(function () {
    'use strict';

    angular.module('uver').controller('ritiriCtrl', ['$scope','$rootScope','$location','$http','$state','$timeout','serviceApi','GENERAL_CONFIG','ritiri','applicationLocalStorageService',ritriCtrl]);

    function ritriCtrl($scope,$rootScope,$location,$http, $state, $timeout,serviceApi,GENERAL_CONFIG,ritiri,applicationLocalStorageService) {
    	
        
          console.log($rootScope.loginUsers[0].id + "jhjhjh");
          $scope.currentuserID = $rootScope.loginUsers[0].id;

       $scope.getRitriDB = function() {
 
    ritri.ritirilist(function(ritrisumaary) {
      $scope.ritri =  ritrisumaary;
      applicationLocalStorageService.storeCache('RitriData', ritrisumaary);
      console.log($scope.ritri);
    });
     
  };
  
  if (!applicationLocalStorageService.checkKey('RitriData')) {
             $scope.getRitriDB();
        }else{
          $scope.ritri = applicationLocalStorageService.getCache('RitriData');
        }

  $scope.refreshRitri = function() {

    console.log('Refreshing');
    $scope.getRitriDB();

    $timeout(function() {
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.refreshComplete');
    }, 1250);
  };
  
  $scope.ritriview = function(itemId){
    var result ={retriId:itemId};
          $state.go('app.ritirilx',result);
      };

      //consegna implemantation
  
      

       $scope.ritirieff = function(itemId){
        ritri.find(itemId, function(ritriDetail) {
          $rootScope.ritriID = ritriDetail.id_ritiro;
          });
                 $location.path('/app/rifiuta');
          
        
      };
      $scope.mancatiritiri = function(itemId){
          ritri.find(itemId, function(ritriDetail) {
          $rootScope.ritriID = ritriDetail.id_ritiro;
          });
                 $location.path('/app/ritira');
          
        
      };
          
  
}


})();
