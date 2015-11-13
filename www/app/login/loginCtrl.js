(function () {
    'use strict';

    angular.module('uver').controller('loginController', ['$scope','$http','$state','$timeout','$ionicLoading','$ionicBackdrop','$ionicPopup','serviceApi','GENERAL_CONFIG',loginController]);

    function loginController($scope,$http, $state,$timeout,$ionicLoading,$ionicBackdrop,$ionicPopup,serviceApi,GENERAL_CONFIG) {
      serviceApi.getUsers()
      .then(function (response) {
         if (response == '204') {
           $scope.loginError = true;
        }
         else {
           $scope.users = response;
           localStorage.setItem("users",JSON.stringify(response.rows));
           $scope.userDetails = localStorage.getItem('users');
           console.log($scope.userDetails);
          $scope.userDetails = JSON.parse($scope.userDetails);
         }  
       });

         $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };

   $scope.doLogin = function(userPassword,email){
       
    $scope.show();
      $scope.checkUser(userPassword,email);
  };

  $scope.checkUser = function(userPassword,email){
  var password_attempt = userPassword;
          $scope.loginUsers = _.filter($scope.userDetails, function(user) {
                    return TwinBcrypt.compareSync(password_attempt, user.password) && user.email == email ;
                });

          if($scope.loginUsers.length==1){
            console.log("itsmatching");
             setTimeout(function() {$scope.hide();
             localStorage.setItem("currentUser",JSON.stringify($scope.loginUsers));
             $state.go('app.profile');
             }, 1000);
            
          }
          else{
           setTimeout(function() {$scope.hide();
            $scope.showAlert();
           }, 1000);
            console.log("its not matching");
          
        }
}

 $scope.showAlert = function() {
  var alertPopup = $ionicPopup.alert({
      title: 'Invalid user!!!',
      template: 'Your Email and password not matching'
      });
    }; 
}




})();
