var Weather = function(map) {
  this.map = map;
  this.geoJSON = null;
  this.request = null;
  this.gettingData = false;
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
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + this.apiKey
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
  checkIfDataRequested: function() {
      // Stop extra requests being sent
      while (gettingData === true) {
        request.abort();
        gettingData = false;
      }
      getCoords();
  },
  getCoords: function() {
        var bounds = this.map.getBounds();
        var NE = bounds.getNorthEast();
        var SW = bounds.getSouthWest();
        getWeather(NE.lat(), NE.lng(), SW.lat(), SW.lng());
        console.log(bounds);
  },
  getWeather: function(northLat, eastLng, southLat, westLng, map) {
    this.gettingData = true;
    var url = "http://api.openweathermap.org/data/2.5/box/city?bbox=" 
    + westLng + "," + northLat + "," //left top 
    + eastLng + "," + southLat + "," //right bottom
    + map.getZoom() + "&cluster=yes&format=json" + "&APPID=" + this.apiKey;
    this.makeRequest(url, function() {
      if (this.status !== 200){
        return;
      }
      var jsonString = this.responseText;
      results = JSON.parse(jsonString);
      console.log(results);
      this.processResults(results);
    }.bind(this))
  },
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
    }
  },
  drawIcons: function (weather) {
     this.map.data.addGeoJson(this.geoJSON);
     // Set the flag to finished
     gettingData = false;
  },
  resetData: function (map) {
    this.geoJSON = {
      type: "FeatureCollection",
      features: []
    };
    map.data.forEach(function(feature) {
      map.data.remove(feature);
    });
  }
}

module.exports = Weather;