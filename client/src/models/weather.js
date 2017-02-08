var Weather = function() {
  this.apiKey = "2f99194c7b21871f02ba48c822e9600e";
}

Weather.prototype = {
  makeRequest: function(url, callback) {
      var request = new XMLHttpRequest();
      request.open("GET", url);
      request.onload = callback;
      request.send();
  },
  findWeatherByCoords: function(lat, lon, callback) {
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + this.apiKey;
    this.makeRequest(url,  function(){
          if (this.status !== 200){
            return;
          }
          var jsonString = this.responseText;
          weather = JSON.parse(jsonString);
          callback(weather);    
    }
  )}
}

module.exports = Weather;