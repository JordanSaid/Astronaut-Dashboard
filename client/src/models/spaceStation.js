var SpaceStation = function() {

};

SpaceStation.prototype = {
  makeRequest: function(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.timeout = 2000;
    request.onload = callback;
    request.ontimeout = function (e) {
      console.log("timeout")
    };
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
  },
  currentLat: function(callback) {
    this.makeRequest("http://api.open-notify.org/iss-now.json", function() {
      if (this.status !== 200){
        return;
      }
      var jsonString = this.responseText;
      var station = JSON.parse(jsonString);
      var stationLat = station.iss_position.latitude;
      callback(stationLat);
    });
  },
  currentLon: function(callback) {
    this.makeRequest("http://api.open-notify.org/iss-now.json", function() {
      if (this.status !== 200){
        return;
      }
      var jsonString = this.responseText;
      var station = JSON.parse(jsonString);
      var stationLon = station.iss_position.longitude;
      callback(stationLon);
    });
  },

}

module.exports = SpaceStation;