﻿(function () {
    'use strict';

    angular.module('uver').factory('serviceApi', ['$http', '$rootScope', '$q', '$ionicLoading', 'GENERAL_CONFIG', serviceApi]);

    function serviceApi($http, $rootScope, $q, $ionicLoading, GENERAL_CONFIG) {

        // Common method to peroform post http call.
        function doPostHttp(functionName, url, data) {
            var deferred = $q.defer();

            busyCursorStart();

            $http.post(url, data)
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

            $http.get({
                method: 'PUT',
                url: url,
                headers: data
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
            
            };

            function getUsers() {
            console.log("calling Users");

            var url = GENERAL_CONFIG.API_URL + 'users';

            // Create data for API call 
            var data = {"Authorization": "Basic" +  btoa("app@polettoweb.com:pvi3Ez-DUQVz-Dw3QbQ-V99BH") + '='};

            return doGetHttp("getUsers", url, data);
        }

        //$http({method: 'GET', url: '/entity/'+id+'?access_token='+token, headers: {'Authorization': 'Bearer '+token}}).then(function(response){ }); 

    }
})();



