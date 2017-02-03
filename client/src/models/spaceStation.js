var SpaceStation = function() {

};

SpaceStation.prototype = {
  makeRequest: function(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = callback;
    request.send();
  },
  all: function(callback) {
    var self = this;
    this.makeRequest("http://api.open-notify.org/iss-now.json", function() {
      if (this.status !== 200){
        return;
      }
      var jsonString = this.responseText;
      var station = JSON.parse(jsonString);
      callback(station);
      console.log(station);
    });
<<<<<<< HEAD
=======
  },
  currentLocation: function(callback) {
    this.makeRequest("http://api.open-notify.org/iss-now.json", function() {
      if (this.status !== 200){
        return;
      }
      var jsonString = this.responseText;
      var station = JSON.parse(jsonString);

      var stationLat = station.iss_position.latitude;
      var stationLon = station.iss_position.longitude;
      var spaceStationLocation = {lat: parseInt(stationLat), lng: parseInt(stationLon)};

      callback(spaceStationLocation);
    });
>>>>>>> 9c6a596093e7f056fbbaf844275740b9fcca3ddc
  }
}

module.exports = SpaceStation;