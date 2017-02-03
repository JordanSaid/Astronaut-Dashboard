var MapWrapper = function(container, coordinates, zoom) {
  var container = document.querySelector("#right");
  this.googleMap = new google.maps.Map(container, {
    center: coordinates,
    zoom: zoom
  });
}

MapWrapper.prototype = {
  addMarker: function(coordinates) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
    });
      this.googleMap.setCenter(coordinates)
  },
  setCurrentLocation: function(position) {
      var pos = {lat: position.coords.latitude, lng: position.coords.longitude};
      this.googleMap.setCenter(pos);
      this.googleMap.setZoom(15);
  },
}

module.exports = MapWrapper;