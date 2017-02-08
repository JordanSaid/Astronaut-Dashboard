var Country = require('./country');

var Countries = function() {
}

Countries.prototype = {
  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = callback;
    request.send();
  },
  all: function(callback) {
    var self = this;
    this.makeRequest("https://restcountries.eu/rest/v1/all", function(){
      if (this.status !== 200){
        return;
      }
      var jsonString = this.responseText;
      countries = JSON.parse(jsonString);
      console.log(countries);
      callback(countries);    
    }
    )}
  }

  module.exports = Countries;