(function () {
    'use strict';

    angular.module('uver').controller('loginController', ['$scope','$http','$state','$ionicLoading','serviceApi','GENERAL_CONFIG',loginController]);

    function loginController($scope,$http, $state,$ionicLoading,serviceApi,GENERAL_CONFIG) {
    	 $http({method: 'GET', url: 'http://polettoweb.com/sximoapi?module=users', headers: {'Authorization': 'Basic '+'YXBwQHBvbGV0dG93ZWIuY29tOnB2aTNFei1EVVFWei1EdzNRYlEtVjk5Qkg'}})
         .then(function (response) {
         if (response == '204') {
           $scope.loginError = true;
        }
         else {
           $scope.users = response;
          
           localStorage.setItem("users",JSON.stringify($scope.users.data.rows));
           $scope.userDetails = localStorage.getItem('users');
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
        var password_attempt = userPassword;

        
                $scope.loginUsers = _.filter($scope.userDetails, function(user) {
                    
                    return TwinBcrypt.compareSync(password_attempt, user.password) && user.email == email ;

                });
       $scope.hide();
  
    
  
  console.log($scope.loginUsers);
          
  }; 
}


})();
