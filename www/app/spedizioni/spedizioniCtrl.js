(function () {
    'use strict';

    angular.module('uver').controller('spedizioniCtrl', ['$scope','$http','$state','$timeout','serviceApi','GENERAL_CONFIG','spedizioni','applicationLocalStorageService',spedizioniCtrl]);

    function spedizioniCtrl($scope,$http, $state, $timeout,serviceApi,GENERAL_CONFIG,spedizioni,applicationLocalStorageService) {
    	


       $scope.getSpediZioniDB = function() {
 
    spedizioni.list(function(spedizionisumaary) {
      $scope.spedizioni =  spedizionisumaary;
      applicationLocalStorageService.storeCache('SpedizioniData', spedizionisumaary);
    });
     
  };
  
  if (!applicationLocalStorageService.checkKey('SpedizioniData')) {
             $scope.getSpediZioniDB();
        }else{
          $scope.spedizioni = applicationLocalStorageService.getCache('SpedizioniData');
        }

  $scope.refreshSpediZioni = function() {

    console.log('Refreshing');
    $scope.getSpediZioniDB();

    $timeout(function() {
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.refreshComplete');
    }, 1250);
  };
 
  
  $scope.view = function(itemId){
    var result ={spedizioniId:itemId};
          $state.go('app.view',result);
      };
          
  
}


})();
