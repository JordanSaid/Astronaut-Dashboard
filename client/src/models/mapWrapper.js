var MapWrapper = function(container, coordinates, zoom) {
  this.markers = [];
  var container = document.querySelector("#map-div");
  this.googleMap = new google.maps.Map(container, {
    center: coordinates,
    zoom: zoom,
    styles: [
    {elementType: 'geometry', stylers: [{color: '#2F4F4F'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
     featureType: 'administrative.locality',
     elementType: 'labels.text.fill',
     stylers: [{color: '#d59563'}]
   },
   {
     featureType: 'poi',
     elementType: 'labels.text.fill',
     stylers: [{color: '#d59563'}]
   },
   {
     featureType: 'poi.park',
     elementType: 'geometry',
     stylers: [{color: '#263c3f'}]
   },
   {
     featureType: 'poi.park',
     elementType: 'labels.text.fill',
     stylers: [{color: '#6b9a76'}]
   },
   {
     featureType: 'road',
     elementType: 'geometry',
     stylers: [{color: '#38414e'}]
   },
   {
     featureType: 'road',
     elementType: 'geometry.stroke',
     stylers: [{color: '#212a37'}]
   },
   {
     featureType: 'road',
     elementType: 'labels.text.fill',
     stylers: [{color: '#9ca5b3'}]
   },
   {
     featureType: 'road.highway',
     elementType: 'geometry',
     stylers: [{color: '#746855'}]
   },
   {
     featureType: 'road.highway',
     elementType: 'geometry.stroke',
     stylers: [{color: '#1f2835'}]
   },
   {
     featureType: 'road.highway',
     elementType: 'labels.text.fill',
     stylers: [{color: '#f3d19c'}]
   },
   {
     featureType: 'transit',
     elementType: 'geometry',
     stylers: [{color: '#2f3948'}]
   },
   {
     featureType: 'transit.station',
     elementType: 'labels.text.fill',
     stylers: [{color: '#d59563'}]
   },
   {
     featureType: 'water',
     elementType: 'geometry',
     stylers: [{color: '#17263c'}]
   },
   {
     featureType: 'water',
     elementType: 'labels.text.fill',
     stylers: [{color: '#515c6d'}]
   },
   {
     featureType: 'water',
     elementType: 'labels.text.stroke',
     stylers: [{color: '#17263c'}]
   }
   ]
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
      this.googleMap.setZoom(4);
  },
  addMarker: function(coords) {
    this.clearMarkers();
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
    })
    this.markers.push(marker);
  },
  addAstroMarker: function(coords) {
    var astro = {
      url: "astro.png", 
      scaledSize: new google.maps.Size(50, 50), 
      origin: new google.maps.Point(0,0), 
      anchor: new google.maps.Point(0, 0) 
    };
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
      icon: astro
    })
    this.markers.push(marker);
  },
  addInfoMarker: function(coords, contentString) {
    var infoWindow = new google.maps.InfoWindow ({
      content: contentString,
      position: coords,
      map: this.googleMap
      });
    this.markers.push(infoWindow);
  },
  setButtonClickNewCenter: function(button, coords, zoom) {
    button.onclick = function() {
      this.googleMap.setCenter(coords);
      this.googleMap.setZoom(zoom);
    }.bind(this)
  },
  setMapOnAll: function (map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  },
  clearMarkers: function () {
    this.setMapOnAll(null);
  },
  showMarkers: function () {
    this.setMapOnAll(map);
  },
  setCenter: function(lati, lngi, zoom) {
    this.googleMap.setCenter({lat: lati, lng: lngi});
    this.googleMap.setZoom(zoom);
  },
  mapClickChangesWeather: function(weather, ui) {
    google.maps.event.addListener(this.googleMap, "click", function(event) {
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();
      weather.findWeatherByCoords(lat, lng, function(weathers) {
        this.googleMap.setCenter({lat: lat, lng: lng});
        // this.clearMarkers();
        this.addMarker({lat: lat, lng: lng});
        ui.renderWeather(weathers);
      }.bind(this))  
    }.bind(this))
  }
}

module.exports = MapWrapper;

