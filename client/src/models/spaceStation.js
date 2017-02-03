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
  }
}

module.exports = SpaceStation;