(function () {
    'use strict';


    angular.module('uver').factory("geolocationService",  function($ionicPlatform, $cordovaGeolocation) {

  var positionOptions = {timeout: 10000, enableHighAccuracy: true};

  return {
    getPosition: function() {
      return $ionicPlatform.ready()
        .then(function() {
          return $cordovaGeolocation.getCurrentPosition(positionOptions);
        })
    }
  };

});


})();