uver.controller('userCtrl', ['$scope', '$rootScope', '$location',
    function($scope, $rootScope, $location) {
      $scope.profile = {avatar : 'img/profile-avatar.png'};

      $scope.register = function(){
          $location.path('/app/register');
      };
      $scope.doLogin = function(){
          $location.path('/app/profile');
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
