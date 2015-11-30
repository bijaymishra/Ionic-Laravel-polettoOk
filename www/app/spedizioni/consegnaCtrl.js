(function () {
    //'use strict';

    angular.module('uver').controller('consegnaCtrl', ['$scope','$rootScope','$location','$http','$state','$timeout','$cordovaCamera','serviceApi','GENERAL_CONFIG','spedizioni','applicationLocalStorageService',consegnaCtrl]);

    function consegnaCtrl($scope,$rootScope,$location,$http, $state, $timeout,$cordovaCamera,serviceApi,GENERAL_CONFIG,spedizioni,applicationLocalStorageService) {
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
       return ((now.getMonth() + 1) + '-' + (now.getDate()) + '-' + now.getFullYear() + " " + now.getHours() + ':'
                     + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
                     .getSeconds()) : (now.getSeconds())));
}
        
        //Cmaera Plugin implementation
$scope.images = [];
      
      $scope.urlForImage = function(imageName) {
        var name = imageName.substr(imageName.lastIndexOf('/') + 1);
        var trueOrigin = cordova.file.dataDirectory + name;
        return trueOrigin;
      };
$scope.addImage = function() {
  var options = {
 destinationType : Camera.DestinationType.FILE_URI,
 sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
 allowEdit : false,
 encodingType: Camera.EncodingType.JPEG,
 popoverOptions: CameraPopoverOptions,
 };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {

          if($scope.images.length<3){
            
          onImageSuccess(imageData);

          function onImageSuccess(fileURI) {
           createFileEntry(fileURI);
           }
            function createFileEntry(fileURI) {
          window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
            }

           function copyFile(fileEntry) {
             var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
             var newName = makeid() + name;
             
             window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
             fileEntry.copyTo(
             fileSystem2,
             newName,
             onCopySuccess,
             fail
             );
             },
             fail);
             }
             function onCopySuccess(entry) {
 $scope.$apply(function () {
 $scope.images.push(entry.nativeURL);
 });
 }
 
 function fail(error) {
 console.log("fail: " + error.code);
 }
 
 function makeid() {
 var text = "";
 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
 for (var i=0; i < 5; i++) {
 text += possible.charAt(Math.floor(Math.random() * possible.length));
 }
 return text;
 }
 }else{
  $scope.picAllow = false;
  alert("Max three pics can be inserted.");
 }
 }, function(err) {
 console.log(err);
 });
}
       




        $scope.deliverShipping = function(){
          for(var i=0;i<$scope.images.length;i++){
        if($scope.images[i] == undefined){
          $scope.images[i] = "";
        }
      }

          var formData = {
            "id_spedizione": $rootScope.spedizioniID,
            "id_consegna":"",
            "nome_firmatario":$scope.giacenza.signer,
            "created_at":getTimeStamp(),
            "entry_by": $rootScope.loginUsers[0].id,
            "lat": $rootScope.Latitude,
            "long": $rootScope.longitude,
            "foto1": "",//$scope.images[0],
            "foto2": "",//$scope.images[1],
            "foto3": "",//$scope.images[2],
            "id_stato_consegna":$scope.giacenza.statusSelect,
            "note_cs_autista": $scope.giacenza.note,

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
      $scope.consegna = function(itemId){
          $location.path('/app/consegna');
          spedizioni.find(itemId, function(spedizioniDetail) {
          $scope.spedizioniDetails = spedizioniDetail;
          console.log($scope.spedizioniDetails);
        });
      };
          
  
}


})();
