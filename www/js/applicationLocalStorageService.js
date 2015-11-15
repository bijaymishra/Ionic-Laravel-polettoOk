(function () {
    'use strict';

    angular.module('uver').factory('applicationLocalStorageService', ['$q', 'CacheFactory', applicationLocalStorageService]);

    function applicationLocalStorageService($q, CacheFactory) {

        var cacheName = 'applicationCache';
        CacheFactory(cacheName, {
            maxAge: 60 * 60 * 1000,
            deleteOnExpire: 'aggressive',
            onExpire: function (key, value) {
                self.userCache = DSCacheFactory.get(cacheName);
                    self.userCache.destroy(key);
            }
            });

        // Public method expose for outside. 
        return {
                removeAll: function () {
                    CacheFactory.removeAll();
                },

                getCache: function (key) {
                    console.log('Get Cache : ' + CacheFactory.get(key));

                    self.userCache = CacheFactory.get(cacheName);

                    return self.userCache.get(key);
                },

                checkKey: function (key) {

                    self.userCache = CacheFactory.get(cacheName);

                    console.log('checking for cache key : ' + self.userCache.info(key));

                    return self.userCache.get(key);
                },

                storeCache: function (key, value) {
                    self.userCache = CacheFactory.get(cacheName);

                    self.userCache.put(key, value);

                    console.log('insert value in cache : ' +key);
                },

                removeCache: function (key) {

                    self.userCache = DSCacheFactory.get(cacheName);
                    self.userCache.remove(key);

                    console.log('cache removed : ' +key);
                },

                destroyCache: function (key) {

                    self.userCache = DSCacheFactory.get(cacheName);
                    self.userCache.destroy(key);

                    console.log('cache destroy : ' +Key);
                }
                };
            };

    }) ();



