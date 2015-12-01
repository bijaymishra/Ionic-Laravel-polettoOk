(function () {
    //'use strict';

    angular.module('uver').controller('consegnaCtrl', ['$scope','$rootScope','$location','$http','$state','$timeout','$cordovaCamera','$cordovaCapture','$cordovaImagePicker','$ionicActionSheet','serviceApi','GENERAL_CONFIG','spedizioni','applicationLocalStorageService','Photo',consegnaCtrl]);

    function consegnaCtrl($scope,$rootScope,$location,$http, $state, $timeout,$cordovaCamera,$cordovaCapture, $cordovaImagePicker, $ionicActionSheet,serviceApi,GENERAL_CONFIG,spedizioni,applicationLocalStorageService,Photo) {
       $scope.picAllow = true;
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
        $scope.giacenza ={
          signer:'',
          statusSelect:'',
          note:''
        } ;
        function getTimeStamp() {
       var now = new Date();
       return ((now.getFullYear() + 1) + '-' + (now.getMonth()) + '-' + now.getDate() + " " + now.getHours() + ':'
                     + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
                     .getSeconds()) : (now.getSeconds())));
}
        

        $scope.deliverShipping = function(){
          for(var i=0;i<$scope.images.length;i++){
        if($scope.images[i] == undefined){
          $scope.images[i] = "";
        }
      }

        if($rootScope.Latitude == undefined && $rootScope.longitude == undefined){
          $rootScope.Latitude = "";
          $rootScope.longitude = "";
        }

          var formData = {
             "id_spedizione": $rootScope.spedizioniID,
            "nome_firmatario":$scope.giacenza.signer,
            "created_at":getTimeStamp(),
            "foto1": "",//$scope.images[0],
            "foto2": "",//$scope.images[1],
            "foto3": "",//$scope.images[2],
            "entry_by": $rootScope.loginUsers[0].id,
            "id_stato_consegna":$scope.giacenza.statusSelect,
            "note_cs_autista": $scope.giacenza.note,
            "updated_at":"0000-00-00 00:00:00",
            "read":0,
             "lat": $rootScope.Latitude,
            "long": $rootScope.longitude,

          };
          console.log(formData);

          serviceApi.consegnaCtrl(formData)
      .then(function (response) {
          if (response == '204') {
            alert("please check your internet connection");
          }
          else {
            alert("La spedizione è stata correttamente consegnata");
          }
        },
        function (err) {
          alert("Something not right please try again!!!");
      
        });
        }
     


      //new Code Start

         // action sheet
        $scope.showAction = function () {
                    var options = {
                            maximumImagesCount: 1,
                        };
          // capture
                        $cordovaCapture.captureImage(options).then(function (imageData) {
                            var imgData = imageData[0].fullPath;
                            // convert image to base64 string
                            Photo.convertImageToBase64(imgData, function(base64Img){
                                $scope.formData.photo = base64Img;
                                alert($scope.formData.photo);
                            });

                        }, function (error) {
                            $scope.photoError = error;
                        });
            
        };

      //Ends
          
  
}


})();
