var WeatherItem = function(options) {
  this.city = options.city;
  this.temperature = options.temperature;
  this.weatherDescription = options.weatherDescription;
  this.weatherIcon = options.weatherIcon;
}

module.exports = WeatherItem;