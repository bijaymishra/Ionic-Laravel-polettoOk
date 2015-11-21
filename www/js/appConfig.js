(function () {

    'use strict';

    var config_module = angular.module('uver.config', []);

    var config_data = {
        'GENERAL_CONFIG': {

            'APP_KEY': 'YXBwQHBvbGV0dG93ZWIuY29tOnB2aTNFei1EVVFWei1EdzNRYlEtVjk5Qkg'+'=', // production
           
            'APP_NAME': 'PolettoOk',
            'APP_VERSION': '1.0.0',
            'API_VERSION': '1',
            'GA_enabled' : false,
            'API_USING': 'production',
            'API_URL': 'http://polettoweb.com/',
            
    }
  }
    angular.forEach(config_data, function (key, value) {
        config_module.constant(value, key);
    });
})();

