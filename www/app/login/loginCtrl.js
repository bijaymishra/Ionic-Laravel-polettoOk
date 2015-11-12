(function () {
    'use strict';

    angular.module('uver').controller('loginController', ['$scope','$http','$state','serviceApi','GENERAL_CONFIG',loginController]);

    function loginController($scope,$http, $state,serviceApi,GENERAL_CONFIG) {
    	 $http({method: 'GET', url: 'http://polettoweb.com/sximoapi?module=users', headers: {'Authorization': 'Basic '+'YXBwQHBvbGV0dG93ZWIuY29tOnB2aTNFei1EVVFWei1EdzNRYlEtVjk5Qkg'}})
         .then(function (response) {
         if (response == '204') {
           $scope.loginError = true;
        }
         else {
           $scope.users = response;
           console.log($scope.users.data.rows[0]);
           localStorage.setItem("users",response);
         } 
       });

    	$scope.doLogin = function(userPassword,email){
        var password_attempt = userPassword;
        
  if ( TwinBcrypt.compareSync(password_attempt, "$2y$10$JhIsQC0fij701iKSiC.mk.tSHeOM6dbHjsvVf38uJmBh1eOTlSzxW")){
   console.log("It matches");
   $state.go("app.profile");
 }
else{
    console.log("It doe's not matches");
  }
  
          
  }; 
}


})();
