angular.module('uver').factory('ritri', function($http,serviceApi,applicationLocalStorageService) {
 var cachedData;
 
  function getData(callback) 
  {
 
    serviceApi.getRitri()
      .then(function (response) {
           cachedData = response;
           callback(response);
       });
   
   }
 
  return {
    ritirilist: getData,
    find: function(id, callback) {
      console.log(id);
      var ritriDetail = cachedData.rows.filter(function(entry){
        return entry.id_ritiro == id;
      })[0];
      callback(ritriDetail);
    }
  };
 
});
     
  