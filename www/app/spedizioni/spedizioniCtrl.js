(function () {
    'use strict';

    angular.module('uver').controller('spedizioniCtrl', ['$scope','$location','$http','$state','$timeout','serviceApi','GENERAL_CONFIG','spedizioni','applicationLocalStorageService',spedizioniCtrl]);

    function spedizioniCtrl($scope,$location,$http, $state, $timeout,serviceApi,GENERAL_CONFIG,spedizioni,applicationLocalStorageService) {
    	
        $scope.currentuser = localStorage.getItem('users');
          $scope.currentuser = JSON.parse($scope.currentuser);
          console.log($scope.currentuser);

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

      //consegna implemantation
  
      

       $scope.giacenza = function(itemId){
         spedizioni.find(itemId, function(spedizioniDetail) {
          $scope.spedizioniDetails = spedizioniDetail;
          serviceApi.getStatus()
            .then(function (response) {
          //$scope.statusIds = response;
            $scope.statusIds = [{
  id: 1,
  label: 'aLabel',
  subItem: { name: 'aSubItem' }
}, {
  id: 2,
  label: 'bLabel',
  subItem: { name: 'bSubItem' }
}];
            console.log($scope.statusIds);
            $location.path('/app/giacenza');

                   });
         
          
        });
      };
      $scope.consegna = function(itemId){
          $location.path('/app/consegna');
          spedizioni.find(itemId, function(spedizioniDetail) {
          $scope.spedizioniDetails = spedizioniDetail;
          console.log($scope.spedizioniDetails);
        });
      };
          
  
}


})();
