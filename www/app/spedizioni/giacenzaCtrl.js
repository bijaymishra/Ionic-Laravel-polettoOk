(function () {
    'use strict';

    angular.module('uver').controller('giacenzaCtrl', ['$scope','$location','$http','$state','$timeout','serviceApi','GENERAL_CONFIG','spedizioni','applicationLocalStorageService',giacenzaCtrl]);

    function giacenzaCtrl($scope,$location,$http, $state, $timeout,serviceApi,GENERAL_CONFIG,spedizioni,applicationLocalStorageService) {
    	
        $scope.currentuser = localStorage.getItem('users');
          $scope.currentuser = JSON.parse($scope.currentuser);
          console.log($scope.currentuser);

      //consegna implemantation
      //serviceApi.getStatus()
        //    .then(function (response) {
            
          $scope.statusIds =[{"id_stato":4,"nome_stato":"Destinatario chiuso per ferie","descrizione":"<p>Destinatario chiuso per ferie</p>"},{"id_stato":3,"nome_stato":"Destinatario assente","descrizione":"<p>Destinatario assente</p>"},{"id_stato":5,"nome_stato":"Destinatario trasferito","descrizione":"<p>Destinatario trasferito</p>"},{"id_stato":6,"nome_stato":"Destinatario non trovato","descrizione":"<p>Destinatario non trovato</p>"},{"id_stato":7,"nome_stato":"Impossibile consegnare","descrizione":"<p>Impossibile consegnare</p>"},{"id_stato":8,"nome_stato":"Indirizzo sbagliato","descrizione":"<p>Indirizzo sbagliato</p>"},{"id_stato":9,"nome_stato":"Merce respinta","descrizione":"<p>Merce respinta</p>"},{"id_stato":10,"nome_stato":"Non risponde al preavviso telefonico","descrizione":"<p>Non risponde al preavviso telefonico</p>"},{"id_stato":11,"nome_stato":"Non ritirata da destinatario","descrizione":"<p>Non ritirata da destinatario</p>"},{"id_stato":12,"nome_stato":"Richiesta al preavviso","descrizione":"<p>Richiesta al preavviso</p>"},{"id_stato":13,"nome_stato":"Rifiuta al preavviso","descrizione":"<p>Rifiuta al preavviso</p>"},{"id_stato":14,"nome_stato":"Ritira destinatario","descrizione":"<p>Ritira destinatario</p>"},{"id_stato":15,"nome_stato":"Destinatario chiuso","descrizione":"<p>Destinatario chiuso</p>"},{"id_stato":16,"nome_stato":"Consegnata","descrizione":"<p>consegnata</p>"},{"id_stato":17,"nome_stato":"Consegnata con riserva","descrizione":""}];
            //$scope.statusIds = JSON.stringify($scope.statusIds.rows);
            console.log($scope.statusIds);
          //  });
      $scope.consegna = function(itemId){
          $location.path('/app/consegna');
          spedizioni.find(itemId, function(spedizioniDetail) {
          $scope.spedizioniDetails = spedizioniDetail;
          console.log($scope.spedizioniDetails);
        });
      };
          
  
}


})();
