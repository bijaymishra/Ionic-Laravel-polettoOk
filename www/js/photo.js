// factory
(function () {
    'use strict';

    angular.module('uver').factory('Photo', function () {
    return {

        convertImageToBase64: function (url, callback, output) {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function(){
                var canvas = document.createElement('CANVAS'),
                    c = canvas.getContext('2d'), urlData;
                canvas.height = this.height;
                canvas.width = this.width;
                c.drawImage(this, 0, 0);
                urlData = canvas.toDataURL(output);
                callback(urlData);
                canvas = null;
            };
            img.src = url;
        }

    };

     })
})();
   