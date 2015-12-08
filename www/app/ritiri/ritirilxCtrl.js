(function () {
    'use strict';

    angular.module('uver').controller('ritirilxCtrl', ['$scope','$http','$state','$stateParams','serviceApi','GENERAL_CONFIG','ritri',ritirilxCtrl]);

    function ritirilxCtrl($scope,$http, $state,$stateParams,serviceApi,GENERAL_CONFIG,ritri) {
    	

    ritri.find($stateParams.retriId, function(retriDetail) {
    $scope.ritriDetails = retriDetail;
    console.log($scope.spedizioniDetails);
  });

     $scope.giacenza = function(itemId){
        ritri.find(itemId, function(retriDetail) {
          $rootScope.spedizioniID = retriDetail.id_spedizione;
          });
                 $location.path('/app/giacenza');
          
        
      };
      $scope.consegna = function(itemId){
          ritri.find(itemId, function(retriDetail) {
          $rootScope.spedizioniID = retriDetail.id_spedizione;
          });
                 $location.path('/app/consegna');
          
        
      };
}


})();
