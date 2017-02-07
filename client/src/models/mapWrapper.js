var MapWrapper = function(container, coordinates, zoom) {
  var container = document.querySelector("#map-div");
  this.googleMap = new google.maps.Map(container, {
    center: coordinates,
    zoom: zoom
  });
}

MapWrapper.prototype = {
  addMarker: function(coordinates) {
    var marker = new google.maps.Marker({
      position: coordinates,
      map: this.googleMap,
    });
      this.googleMap.setCenter(coordinates)
  },
  setCurrentLocation: function(position) {
      var pos = {lat: position.coords.latitude, lng: position.coords.longitude};
      this.googleMap.setCenter(pos);
      this.googleMap.setZoom(15);
  },
  addInfoMarker: function(coords, contentString) {
    var infoWindow = new google.maps.InfoWindow ({
      content: contentString,
      position: coords,
      map: this.googleMap
      });
  },
  setButtonClickNewCenter: function(button, coords, zoom) {
    button.onclick = function() {
      this.googleMap.setCenter(coords);
      this.googleMap.setZoom(zoom);
      console.log(coords);
    }.bind(this)
  },
  mapClickChangesWeather: function() {
    google.maps.event.addListener(this.googleMap, "click", function(event) {
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();
    }.bind(this))
  }
}

module.exports = MapWrapper;