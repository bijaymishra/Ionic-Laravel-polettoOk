(function () {
    'use strict';

    angular.module('uver').controller('spedizioniDetailsCtrl', ['$scope','$http','$state','$stateParams','serviceApi','GENERAL_CONFIG','spedizioni',spedizioniDetailsCtrl]);

    function spedizioniDetailsCtrl($scope,$http, $state,$stateParams,serviceApi,GENERAL_CONFIG,spedizioni) {
    	

    spedizioni.find($stateParams.spedizioniId, function(spedizioniDetail) {
    $scope.spedizioniDetails = spedizioniDetail;
    console.log($scope.spedizioniDetails);
  });
}


})();
