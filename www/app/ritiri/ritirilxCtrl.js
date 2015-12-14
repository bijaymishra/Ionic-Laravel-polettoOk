(function () {
    'use strict';

    angular.module('uver').controller('ritirilxCtrl', ['$scope','$rootScope','$location','$http','$state','$stateParams','serviceApi','GENERAL_CONFIG','ritiri',ritirilxCtrl]);

    function ritirilxCtrl($scope,$rootScope,$location,$http, $state,$stateParams,serviceApi,GENERAL_CONFIG,ritiri) {
    	

    ritiri.find($stateParams.retriId, function(retriDetail) {
    $scope.ritiriDetails = retriDetail;
    console.log($scope.spedizioniDetails);
  });

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
