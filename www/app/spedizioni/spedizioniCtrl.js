(function () {
    'use strict';

    angular.module('uver').controller('spedizioniCtrl', ['$scope','$rootScope','$location','$http','$state','$timeout','serviceApi','GENERAL_CONFIG','spedizioni','applicationLocalStorageService',spedizioniCtrl]);

    function spedizioniCtrl($scope,$rootScope,$location,$http, $state, $timeout,serviceApi,GENERAL_CONFIG,spedizioni,applicationLocalStorageService) {
    	
        
          var currentUser = localStorage.getItem('currentUser');
          //alert(currentUser);
          currentUser = JSON.parse(currentUser);
          console.log(currentUser);
          $scope.currentuserID = currentUser[0].id;

       $scope.getSpediZioniDB = function() {
 
    spedizioni.list(function(spedizionisumaary) {
      $scope.spedizioni =  spedizionisumaary;
      applicationLocalStorageService.storeCache('SpedizioniData', spedizionisumaary);
      console.log($scope.spedizioni);
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
