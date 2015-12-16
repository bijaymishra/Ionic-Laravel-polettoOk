(function () {
    'use strict';

    angular.module('uver').factory('serviceApi', ['$http', '$rootScope', '$q', '$ionicLoading', 'GENERAL_CONFIG', serviceApi]);

    function serviceApi($http, $rootScope, $q, $ionicLoading, GENERAL_CONFIG) {

        // Common method to peroform post http call.
        function doPostlocationHttp(functionName, url, data) {
            var deferred = $q.defer();

             $http(
            {
                method: 'POST',
                url: url,
                headers: {'Authorization': 'Basic YXBwQHBvbGV0dG93ZWIuY29tOnB2aTNFei1EVVFWei1EdzNRYlEtVjk5Qkg'},
                data: data
            })
                .success(function (response) {
                    console.log(functionName + " Success");

                    busyCursorEnd();

                    deferred.resolve(response);
                }).error(function (error, status) {
                    console.log(functionName + " Error :" + error);


                    deferred.reject(error, status);
                });

            return deferred.promise;
        };
        function doPostHttp(functionName, url, data) {
            var deferred = $q.defer();

            busyCursorStart();

             $http(
            {
                method: 'POST',
                url: url,
                headers: {'Content-Type':'application/json','Authorization': 'Basic YXBwQHBvbGV0dG93ZWIuY29tOnB2aTNFei1EVVFWei1EdzNRYlEtVjk5Qkg'},
                data: data
            })
                .success(function (response) {
                    console.log(functionName + " Success");

                    busyCursorEnd();

                    deferred.resolve(response);
                }).error(function (error, status) {
                    console.log(functionName + " Error :" + error);

                    busyCursorEnd();

                    deferred.reject(error, status);
                });

            return deferred.promise;
        };


        function doPostHttpWithTag(functionName, url, widgetName) {
            var deferred = $q.defer();

            busyCursorStart();

            var dashboardWidgetViewModel = {
                Name: widgetName,
                ETag: ''
            };


            // Create data for API call 
            var data = dashboardWidgetViewModel;


            $http.post(url, data).success(function (response) {

                //console.log(" Post call Success " + widgetName);

                busyCursorEnd();


                console.log("Request " + data.Name);
                console.log("Response " + response.Name);


                deferred.resolve(response);

            }).error(function (error, status) {

                busyCursorEnd();

                if (status == "304") {
                    console.log("Tag not modified for " + widgetName);

                    // resolved cached object. 
                    deferred.resolve(cachedObject);
                }
                else {
                    console.log(" Error In :" + functionName);
                    console.log(" Error :" + error);

                    // reject . 
                    deferred.reject(error, status);
                };
            });

            return deferred.promise;
        };

        // Common method to peroform get http call.
        function doGetHttp(functionName, url, data) {
            var deferred = $q.defer();

            busyCursorStart();
                $http(
            {
                method: 'get',
                url: url,
                headers: {'Authorization': 'Basic YXBwQHBvbGV0dG93ZWIuY29tOnB2aTNFei1EVVFWei1EdzNRYlEtVjk5Qkg'}
            })
          
                .success(function (response) {
                    console.log(functionName + "Success");

                    busyCursorEnd();

                    deferred.resolve(response);
                }).error(function (error) {
                    console.log(functionName + " Error :" + error);

                    busyCursorEnd();

                    deferred.reject(error);
                });

            return deferred.promise;
        };

        function doGetHttpWithoutData(functionName, url) {
            var deferred = $q.defer();

            busyCursorStart();

            $http.get(url)
                .success(function (response, status) {
                    console.log(functionName + "Success");
                    console.log("Status: " + status);
                    busyCursorEnd();
                    if (status == '204') {
                        deferred.resolve(status);
                    }
                    else {
                        deferred.resolve(response);
                    }

                }).error(function (error) {
                    console.log(functionName + " Error :" + error);

                    busyCursorEnd();

                    deferred.reject(error);
                });

            return deferred.promise;
        };

        function doPutHttpWithData(data, url, functionName) {
            var deferred = $q.defer();

            busyCursorStart();

            $http(
			{
			    method: 'PUT',
			    url: url,
                headers: {'Authorization': 'Basic YXBwQHBvbGV0dG93ZWIuY29tOnB2aTNFei1EVVFWei1EdzNRYlEtVjk5Qkg'},
			    data: data
			})
			.success(function (response, status) {
			    console.log(functionName + "Success");
			    console.log("Status: " + status);
			    busyCursorEnd();
			    if (status == '204') {
			        deferred.resolve(status);
			    }
			    else {
			        deferred.resolve(response);
			    }

			}).error(function (error) {
			    console.log(functionName + " Error :" + error);

			    busyCursorEnd();

			    deferred.reject(error);
			});

            return deferred.promise;
        };

        function busyCursorStart() {
            $ionicLoading.show({
                template: 'Loading...'
            });
        };

        function busyCursorEnd() {

            $ionicLoading.hide();
        };

        // Public methood avalible to use. 
        return {
            
            getUsers : getUsers,
            getSpedizioni : getSpedizioni,
            getStatus : getStatus,
            gicenzaCTRL : gicenzaCTRL,
            consegnaCtrl : consegnaCtrl,
            getRitiri : getRitiri,
            mancatiritiriCtrl : mancatiritiriCtrl,
            ritirieffappCtrl : ritirieffappCtrl,
            updatelocation : updatelocation
            
            };

            function getUsers() {
            console.log("calling Users");

            var url = GENERAL_CONFIG.API_URL + 'sximoapi?module=users';

            // Create data for API call 
            //var data = {};

            return doGetHttp("getUsers", url);
        };
        function getSpedizioni() {
            console.log("calling Users");

            var url = GENERAL_CONFIG.API_URL + 'sximoapi?module=gestspediz';

            // Create data for API call 
            //var data = {};

            return doGetHttp("getSpedizioni", url);
        }
          function getRitiri() {
            console.log("calling Users");

            var url = GENERAL_CONFIG.API_URL + 'sximoapi?module=gestrit';

            // Create data for API call 
            //var data = {};

            return doGetHttp("getRitiri", url);
        }
         function getStatus() {
            console.log("calling Users");

            var url = GENERAL_CONFIG.API_URL + 'sximoapi?module=statospedix';

            // Create data for API call 
            //var data = {};

            return doGetHttp("getStatus", url);
        }
         function gicenzaCTRL(data) {
            var url = GENERAL_CONFIG.API_URL + 'sximoapi?module=giacenze'

            // Create data for API call 
            var data = {"data":data};
            return doPostHttp("gicenzaCTRL", url, data);
        }
         function consegnaCtrl(data) {
            var url = GENERAL_CONFIG.API_URL + 'sximoapi?module=consegneapp'

            // Create data for API call 
            var data = {"data":data};
            return doPostHttp("consegnaCtrl", url, data);
        }
         function mancatiritiriCtrl(data) {
            var url = GENERAL_CONFIG.API_URL + 'sximoapi?module=mancatiritiriapp'

            // Create data for API call 
            var data = {"data":data};
            return doPostHttp("mancatiritiriCtrl", url, data);
        }
          function ritirieffappCtrl(data) {
            var url = GENERAL_CONFIG.API_URL + 'sximoapi?module=ritirieffapp'

            // Create data for API call 
            var data = {"data":data};
            return doPostHttp("ritirieffappCtrl", url, data);
        }
         function updatelocation(data) {
            var url = GENERAL_CONFIG.API_URL + 'sximoapi?module=locate'

            // Create data for API call 
            var data = {"data":data};
            return doPostlocationHttp("updatelocation", url, data);
        }

    }
})();



