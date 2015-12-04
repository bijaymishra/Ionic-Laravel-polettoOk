angular.module('uver').factory('spedizioni', function($http,serviceApi,applicationLocalStorageService) {
 var cachedData;
 
  function getData(callback) 
  {
 
    serviceApi.getSpedizioni()
      .then(function (response) {
           cachedData = response;
           callback(response);
       });
   
   }
 
  return {
    list: getData,
    find: function(id, callback) {
      console.log(id);
      var spedizioniDetail = cachedData.rows.filter(function(entry){
        return entry.id_spedizione == id;
      })[0];
      callback(spedizioniDetail);
    }
  };
 
});
     
  