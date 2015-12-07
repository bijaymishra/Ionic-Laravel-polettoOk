(function () {
    //'use strict';

    angular.module('uver').controller('mancatiritiriCtrl', ['$scope','$rootScope','$location','$http','$state','$timeout','$cordovaCamera','serviceApi','GENERAL_CONFIG','ritri','applicationLocalStorageService',mancatiritiriCtrl]);

    function mancatiritiriCtrl($scope,$rootScope,$location,$http, $state, $timeout,$cordovaCamera,serviceApi,GENERAL_CONFIG,ritri,applicationLocalStorageService) {
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
        
        //Cmaera Plugin implementation
$scope.images = [];
$scope.encodedImages = [];
      
      $scope.urlForImage = function(imageName) {
        var name = imageName.substr(imageName.lastIndexOf('/') + 1);
        var trueOrigin = cordova.file.dataDirectory + name;
        return trueOrigin;
      };
$scope.addImage = function() {
  var options = {
 destinationType : Camera.DestinationType.DATA_URL,
 sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
 allowEdit : false,
 encodingType: Camera.EncodingType.JPEG,
 popoverOptions: CameraPopoverOptions,
 };
 
         $cordovaCamera.getPicture(options).then(function(imageData) {

          if($scope.encodedImages.length<3){
            
         $scope.images.push("data:image/jpeg;base64," + imageData);
         $scope.encodedImages.push(imageData);
         
          }else{
            $scope.picAllow = false;
            alert("Max three pics can be inserted.");
           }
        
 }, function(err) {
 console.log(err);
 });
}
       




        $scope.withdrawlShipping = function(){
        
       /* if ($scope.encodedImages.length <= 0){ 
          $scope.encodedImages[0] = "";
           $scope.encodedImages[1] = "";
            $scope.encodedImages[2] = "";
        }else{
          for(var i=0;i<$scope.encodedImages.length;i++){
        if($scope.encodedImages[i] == undefined){
          $scope.encodedImages[i] = "";
          }
            }
        }*/
        if ($scope.encodedImages.length <= 0){ 
          $scope.encodedImages[0] = "";
           $scope.encodedImages[1] = "";
            $scope.encodedImages[2] = "";
        }else  if ($scope.encodedImages.length ==1){ 
           $scope.encodedImages[1] = "";
            $scope.encodedImages[2] = "";
        }else  if ($scope.encodedImages.length ==2){ 
            $scope.encodedImages[2] = "";
        }
      

        if($rootScope.Latitude == undefined && $rootScope.longitude == undefined){
          $rootScope.Latitude = "";
          $rootScope.longitude = "";
        }

          var formData = {
             "id_ritiro": $rootScope.ritriID,
            "nome_firmatario":$scope.giacenza.signer,
            "created_at":getTimeStamp(),
            "foto1": $scope.encodedImages[0],
            "foto2": $scope.encodedImages[1],
            "foto3": $scope.encodedImages[2],
            "entry_by": $rootScope.loginUsers[0].id,
            "id_stato":$scope.giacenza.statusSelect,
            "note_rt_autisti": $scope.giacenza.note,
            "updated_at":"0000-00-00 00:00:00",
            "read":0,
             "lat": $rootScope.Latitude,
            "long": $rootScope.longitude,

          };
          console.log(formData);

          serviceApi.mancatiritiriCtrl(formData)
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
      $scope.consegna = function(itemId){
          $location.path('/app/consegna');
          spedizioni.find(itemId, function(spedizioniDetail) {
          $scope.spedizioniDetails = spedizioniDetail;
          console.log($scope.spedizioniDetails);
        });
      };
          
  
}


})();
