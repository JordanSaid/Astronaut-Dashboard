/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var UI = __webpack_require__(1);
	
	window.onload = function () {
	    new UI();
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var News = __webpack_require__(2);
	var MapWrapper = __webpack_require__(3);
	var SpaceStation = __webpack_require__(4);
	
	var UI = function () {
	    this.news = new News();
	    this.news.all(function(headlineArray) {
	        this.render(headlineArray);
	        console.log(headlineArray)
	    }.bind(this))
	    this.container = document.body;
	
	    this.spaceStation = new SpaceStation();
	    this.spaceStation.all(function(detailsArray) {
	    }.bind(this))
	
	    var mapDiv = document.querySelector('#right');
	    // var spaceStationLocation = 
	    this.mapWrapper = new MapWrapper(mapDiv, {lat: 51.510944, lng: -0.129403}, 10);
	
	}
	
	UI.prototype = {
	    // createContainer: function () {
	    //     newContainer = document.createElement('div');
	
	    //     var classList = Array.from(arguments);
	    //     classList.forEach(function (cssClass) {
	    //         newContainer.classList.add(cssClass);
	    //     });
	
	    //     this.container.appendChild(newContainer);
	    //     return newContainer;
	    // },
	
	    render: function (headlinesArray) {
	        var headlines = document.querySelector('#ticker');
	           headlinesArray.forEach(function(headline) {
	             var headlineTitle = document.createElement("p");
	             headlineTitle.innerHTML = "<a href='" + headline.url + "'>" + headline.title + "</a>";
	             headlines.appendChild(headlineTitle);
	           });
	
	        // var headerContainer = this.createContainer('header', 'flex', 'center', 'shadow');
	        // new Header(headerContainer);
	        // var searchBar = new SearchBar(headerContainer);
	
	        // var imageContainer = this.createContainer('image-container', 'flex', 'wrap', 'center');
	        // var imageDisplay = new ImageDisplay(imageContainer);
	        // searchBar.setImageContainer(imageDisplay);
	    },
	    renderMap: function (detailsArray) {
	        var mapWrapper = document.querySelector('#right');
	
	    }
	}
	
	module.exports = UI;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var News = function() {
	
	}
	
	News.prototype = {
	  makeRequest: function(url, callback) {
	    var request = new XMLHttpRequest();
	    request.open("GET", url);
	    request.onload = callback;
	    request.send();
	  },
	  // populateHeadlines: function(headlinesArray) {
	  //   var headlines = document.querySelector('#ticker');
	  //   headlinesArray.forEach(function(headline) {
	  //     var headlineTitle = document.createElement("p");
	  //     headlineTitle.innerText = headline.title;
	  //     headlines.appendChild(headlineTitle);
	  //   })
	  // },
	  all: function(callback) {
	    var self = this;
	    this.makeRequest("https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=fab20889cd4f496eaebc7399e6c081a2", function() {
	      if(this.status !== 200) return;
	      var jsonString = this.responseText;
	      headlines = JSON.parse(jsonString);
	      var headlineArray = headlines.articles;
	      // var titles = self.populateHeadlines(headlineArray);
	      callback(headlineArray);
	    })
	  }
	}
	
	module.exports = News;

/***/ },
/* 3 */
/***/ function(module, exports) {

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

/***/ },
/* 4 */
/***/ function(module, exports) {

	var SpaceStation = function() {
	
	};
	
	SpaceStation.prototype = {
	  makeRequest: function(url, callback) {
	    var request = new XMLHttpRequest();
	    request.open("GET", url);
	    request.onload = callback;
	    request.send();
	  },
	  all: function(callback) {
	    var self = this;
	    this.makeRequest("http://api.open-notify.org/iss-now.json", function() {
	      if (this.status !== 200){
	        return;
	      }
	      var jsonString = this.responseText;
	      var station = JSON.parse(jsonString);
	      callback(station);
	      console.log(station);
	    });
	  }
	}
	
	module.exports = SpaceStation;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map