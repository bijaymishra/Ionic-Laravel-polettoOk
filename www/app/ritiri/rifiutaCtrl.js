(function () {
    //'use strict';

    angular.module('uver').controller('ritirieffappCtrl', ['$scope','$rootScope','$location','$http','$state','$timeout','$cordovaCamera','serviceApi','GENERAL_CONFIG','ritiri','applicationLocalStorageService',ritirieffappCtrl]);

    function ritirieffappCtrl($scope,$rootScope,$location,$http, $state, $timeout,$cordovaCamera,serviceApi,GENERAL_CONFIG,ritiri,applicationLocalStorageService) {
    	 $scope.picAllow = true;
        $scope.currentuser = localStorage.getItem('users');
          $scope.currentuser = JSON.parse($scope.currentuser);
          console.log($scope.currentuser);


      //consegna implemantation
      //serviceApi.getStatus()
        //    .then(function (response) {
            
          $scope.statusIds =[
    {
      "id_stato": 1,
      "nome_stato": "Merce non pronta",
      "descrizione": "<p>Merce non pronta</p>"
    },
    {
      "id_stato": 4,
      "nome_stato": "Ditta chiusa",
      "descrizione": "<p>Ditta chiusa</p>"
    },
    {
      "id_stato": 3,
      "nome_stato": "Attendono il pagamento",
      "descrizione": "<p>Attendono il pagamento</p>"
    },
    {
      "id_stato": 5,
      "nome_stato": "Cliente sconosciuto",
      "descrizione": "<p>Cliente sconosciuto</p>"
    },
    {
      "id_stato": 6,
      "nome_stato": "Imballo non conforme",
      "descrizione": "<p>Imballo non conforme</p>"
    },
    {
      "id_stato": 7,
      "nome_stato": "Nulla da rendere",
      "descrizione": "<p>Nulla da rendere</p>"
    },
    {
      "id_stato": 8,
      "nome_stato": "Indirizzo di carico sbagliato",
      "descrizione": "<p>Indirizzo di carico sbagliato</p>"
    },
    {
      "id_stato": 9,
      "nome_stato": "Quantitativo di carico errato",
      "descrizione": "<p>Quantitativo di carico errato</p>"
    },
    {
      "id_stato": 10,
      "nome_stato": "Ritirata",
      "descrizione": "<p>Ritirata</p>"
    },
    {
      "id_stato": 11,
      "nome_stato": "Ritirata con riserva",
      "descrizione": ""
    },
    {
      "id_stato": 12,
      "nome_stato": "Rifiutata con riserva",
      "descrizione": ""
    }
  ];
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
            
         $scope.encodedImages.push(imageData);
         $scope.images.push("data:image/jpeg;base64," + imageData);
          
          }else{
            $scope.picAllow = false;
            alert("Max three pics can be inserted.");
           }
        
 }, function(err) {
 console.log(err);
 });
}
       
       /* $scope.rejectShipping = function(){
          if ($scope.encodedImages.length <= 0){ 
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
        
            $scope.rejectShipping = function(){
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
            "id_stato_rifiuto":$scope.giacenza.statusSelect,
            "note_rf_autisti": $scope.giacenza.note,
            "updated_at":"0000-00-00 00:00:00",
            "read":0,
             "lat": $rootScope.Latitude,
            "long": $rootScope.longitude,

          };
          console.log($scope.images);

          serviceApi.mancatiritiriCtrl(formData)
      .then(function (response) {
          if (response == '204') {
            alert("please check your internet connection");
          }
          else {
            alert("La spedizione è stata rifiutata");
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
