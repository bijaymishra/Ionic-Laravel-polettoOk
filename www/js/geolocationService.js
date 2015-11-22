(function () {
    'use strict';


    angular.module('uver').factory("geolocationService", ['$q', '$window', '$rootScope', function ($q, $window, $rootScope) {
        return function () {
            var deferred = $q.defer();
            
             if( navigator.geolocation ) {
                
            navigator.geolocation.getCurrentPosition(function (position) {
                $rootScope.$apply(function () {
                    deferred.resolve(position);
                });
            }, function (error) {
                $rootScope.$apply(function () {
                    deferred.reject(error);
                });
            },
             {maximumAge: 100, timeout: 5000, enableHighAccuracy:true});
            }
        else
        {
            
        }

            return deferred.promise;

        }

    }]);


})();