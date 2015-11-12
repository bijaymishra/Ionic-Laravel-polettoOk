uver.controller('userCtrl', ['$scope', '$rootScope', '$location','serviceApi','$http',
    function($scope, $rootScope, $location,serviceApi,$http) {
      $scope.profile = {avatar : 'img/profile-avatar.png'};

     /*serviceApi.getUsers()
      .then(function (response) {
         if (response == '204') {
           $scope.loginError = true;
        }
         else {
           $scope.users = response;
           console.log($scope.users);
           localStorage.setItem("users",response);
         }*/

        
      $scope.register = function(){
          $location.path('/app/register');
      };


      $scope.doLogin = function(userPassword,email){
        var password_attempt = userPassword;
         $http({method: 'GET', url: 'http://polettoweb.com/sximoapi?module=users', headers: {'Authorization': 'Basic '+'YXBwQHBvbGV0dG93ZWIuY29tOnB2aTNFei1EVVFWei1EdzNRYlEtVjk5Qkg'}}).then(function (response) {
         if (response == '204') {
           $scope.loginError = true;
        }
         else {
           $scope.users = response;
           console.log($scope.users.data.rows[0]);
           localStorage.setItem("users",response);
         } 
       });
      /*  var bcrypt = new bCrypt();
  bcrypt.hashpw(password_attempt, bcrypt.gensalt(log_rounds=12), function (hashed) {
      //var cipher = AES(SHA1(hashed));
      // now you have your "secure" hash
      console.log(hashed);*/
      if ( TwinBcrypt.compareSync(password_attempt, "$2y$10$JhIsQC0fij701iKSiC.mk.tSHeOM6dbHjsvVf38uJmBh1eOTlSzxW")){
   console.log("It matches");
   $location.path('/app/profile');
 }
else{
    console.log("It doe's not matches");
  }
  //});
          
      };
      $scope.doRegister = function(){
          $scope.getDeliver();
      };
      $scope.spedizioni = function(){
          $location.path('/app/spedizioni');
      };
      $scope.ritiri = function(){
          $location.path('/app/ritiri');
      };
       $scope.ritirilx = function(){
          $location.path('/app/ritirilx');
      };
      $scope.view = function(){
          $location.path('/app/view');
      };
      $scope.giacenza = function(){
          $location.path('/app/giacenza');
      };
      $scope.consegna = function(){
          $location.path('/app/consegna');
      };
        $scope.ritira = function(){
          $location.path('/app/ritira');
      };
      $scope.rifiuta = function(){
          $location.path('/app/rifiuta');
      };
    }
]);
uver.controller('pickupCtrl', ['$scope', '$rootScope', '$location', '$http', 'pickUpPlace',
    function($scope, $rootScope, $location, $http, pickUpPlace) {
      $scope.place = pickUpPlace;

      $scope.pickupTo = function(){
          $location.path('/app/pickupTo');
      };
      $scope.estimate = function(){
          $location.path('/app/estimate');
      };
      $scope.deliverTracking = function(){
        $location.path('/app/deliverTracking');
      };
      $scope.cancel = function(){
          $location.path('/app/cancel');
      };
      $scope.placePickupFrom = function() {
         $scope.place.from = this.getPlace();
      };
      $scope.placePickupTo = function() {
         $scope.place.to = this.getPlace();
      };
    }
]);
