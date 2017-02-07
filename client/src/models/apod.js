var Apod = function() {
}

Apod.prototype = {
  makeRequest: function(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = callback;
    request.send();
  },
  all: function(callback) {
    var self = this;
    this.makeRequest("https://api.nasa.gov/planetary/apod?api_key=2jS6AJrazGb7n2lUcjjQXucdHtrn65oIVyD14GKd", function() {
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      apodPhoto = JSON.parse(jsonString);
      callback(apodPhoto);
    })
  }
}

module.exports = Apod;