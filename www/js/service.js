uver.factory('pickUpPlace', function() {
  pickUpPlace = {};
  pickUpPlace.to = { formatted_address: '88 Baxter Street' };
  pickUpPlace.from = { formatted_address: 'Center Market Street' };
  pickUpPlace.deliver = {
    "name": "John",
    "place": "60 Baxter Street",
    "placePosition": [40.7280616 , -74.007204],
    "time": "10''",
    "timePosition": [40.7173288, -73.99946879999999],
    "long": "~2km",
    "avatar" : 'img/deliver-avatar.png'
  };
  return pickUpPlace;
});
