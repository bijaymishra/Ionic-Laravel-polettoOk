angular.module('uver').factory('ritiri', function($http,serviceApi,applicationLocalStorageService) {
 var cachedData;
 
  function getData(callback) 
  {
 
    serviceApi.getRitiri()
      .then(function (response) {
           cachedData = response;
           callback(response);
       });
   
   }
 
  return {
    ritirilist: getData,
    find: function(id, callback) {
      console.log(id);
      var ritiriDetail = cachedData.rows.filter(function(entry){
        return entry.id_ritiro == id;
      })[0];
      callback(ritiriDetail);
    }
  };
 
});
     
  