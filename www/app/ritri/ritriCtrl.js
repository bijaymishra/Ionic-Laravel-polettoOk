(function () {
    'use strict';

    angular.module('uver').controller('ritriCtrl', ['$scope','$rootScope','$location','$http','$state','$timeout','serviceApi','GENERAL_CONFIG','ritri','applicationLocalStorageService',ritriCtrl]);

    function ritriCtrl($scope,$rootScope,$location,$http, $state, $timeout,serviceApi,GENERAL_CONFIG,ritri,applicationLocalStorageService) {
    	
        
          console.log($rootScope.loginUsers[0].id + "jhjhjh");
          $scope.currentuserID = $rootScope.loginUsers[0].id;

       $scope.getRitriDB = function() {
 
    ritri.list(function(ritrisumaary) {
      $scope.ritri =  ritrisumaary;
      applicationLocalStorageService.storeCache('RitriData', spedizionisumaary);
      console.log($scope.ritri);
    });
     
  };
  
  if (!applicationLocalStorageService.checkKey('RitriData')) {
             $scope.getRitriDB();
        }else{
          $scope.spedizioni = applicationLocalStorageService.getCache('SpedizioniData');
        }

  $scope.refreshRitri = function() {

    console.log('Refreshing');
    $scope.getRitriDB();

    $timeout(function() {
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.refreshComplete');
    }, 1250);
  };
  
  $scope.view = function(itemId){
    var result ={retriId:itemId};
          $state.go('app.ritirilx',result);
      };

      //consegna implemantation
  
      

       $scope.giacenza = function(itemId){
        spedizioni.find(itemId, function(spedizioniDetail) {
          $rootScope.spedizioniID = spedizioniDetail.id_spedizione;
          });
                 $location.path('/app/giacenza');
          
        
      };
      $scope.consegna = function(itemId){
          spedizioni.find(itemId, function(spedizioniDetail) {
          $rootScope.spedizioniID = spedizioniDetail.id_spedizione;
          });
                 $location.path('/app/consegna');
          
        
      };
          
  
}


})();
