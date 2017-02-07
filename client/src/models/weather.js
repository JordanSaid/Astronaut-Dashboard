var WeatherItem = require('./weatherItem');

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
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + this.apiKey
    console.log(url)
    // 
    this.makeRequest(url,  function(){
          if (this.status !== 200){
            return;
          }
          var jsonString = this.responseText;
          weather = JSON.parse(jsonString);
          console.log(weather);
          callback(weather);    
    }
  )},
  proccessResults: function(results) {
    // var results = JSON.parse(this.responseText);
    if (results.list.length > 0) {
        resetData();
        for (var i = 0; i < results.list.length; i++) {
          this.geoJSON.features.push(jsonToGeoJson(results.list[i]));
        }
        drawIcons(this.geoJSON);
    }
  },
  jsonToGeoJson: function (weatherItem) {
    var feature = {
      type: "Feature",
      properties: {
        city: weatherItem.name,
        weather: weatherItem.weather[0].main,
        temperature: weatherItem.main.temp,
        min: weatherItem.main.temp_min,
        max: weatherItem.main.temp_max,
        humidity: weatherItem.main.humidity,
        pressure: weatherItem.main.pressure,
        windSpeed: weatherItem.wind.speed,
        windDegrees: weatherItem.wind.deg,
        windGust: weatherItem.wind.gust,
        icon: "http://openweathermap.org/img/w/"
              + weatherItem.weather[0].icon  + ".png",
        coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
      },
      geometry: {
        type: "Point",
        coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
      }
    };
  }
}

module.exports = Weather;