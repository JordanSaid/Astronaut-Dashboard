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
    // var marker = new google.maps.Marker ({
    //   position: coords,
    //   map: this.googleMap
    // });
    // marker.addListener('click', function () {
    //   infoWindow.open(this.googleMap, marker);
    // });
  },
  setButtonClickNewCenter: function(button, coords, zoom) {
    button.onclick = function() {
      this.googleMap.setCenter(coords);
      this.googleMap.setZoom(zoom);
      console.log("click")
    }.bind(this)
  },
}

module.exports = MapWrapper;