var News = require('../models/news');
var Apod = require('../models/apod');
var MemoView = require('./memoView');
var MapWrapper = require('../models/MapWrapper');
var SpaceStation = require('../models/spaceStation');
var Weather = require('../models/weather');
var elementResizeDetectorMaker = require("element-resize-detector");


var UI = function () {
    this.news = new News();

    this.news.buzzfeedNews(function(buzzArray) {
            this.renderBuzz(buzzArray);
        }.bind(this))


    this.news.all(function(headlineArray) {
        this.render(headlineArray);
    }.bind(this));

    this.apod = new Apod();
    this.apod.all(function(apodPhoto) {
        this.renderApod(apodPhoto)
    }.bind(this));


    this.container = document.body;

    this.mapWrapper = null;
    this.weather = null;

    this.spaceStation = new SpaceStation();
    this.spaceStation.currentLocation(function(location) {
        var mapDiv = document.querySelector('#map-div');
        this.mapWrapper = new MapWrapper(mapDiv, location, 4);

        this.weather = new Weather(this.mapWrapper.googleMap);
        this.weather.findWeatherByCoords(location.lat, location.lng, function(weather) { 
            this.currentLocationButton()
            this.renderWeather(weather);
            this.renderMapFeatures(location);
        }.bind(this))
    }.bind(this));

    this.renderMemo();
    this.addResizeListener();

}

UI.prototype = {
    renderBuzz: function(buzzArray) {
        var headlines = document.querySelector('#ticker2');

        var marqueeStart = "<marquee direction='left'>";
        var marqueeEnd = "</marquee>";

        buzzArray.forEach(function(buzz) {
            marqueeStart += "<a class='headlinetags' href='" + buzz.url + "'>" + buzz.title + "</a>";
        });

        var buzzMarquee = document.createElement('p');
        buzzMarquee.innerHTML = marqueeStart + marqueeEnd;
        headlines.appendChild(buzzMarquee);
    },

    render: function (headlinesArray) {
        var headlines = document.querySelector('#ticker');
        var marqueeStart = "<marquee direction='left' speed='fast'>";
        var marqueeEnd = "</marquee>";

        headlinesArray.forEach(function(headline) {

            marqueeStart += "<a class='headlinetags' href='" + headline.url + "'>" + headline.title + "</a>";
        });
        var headlineMarquee = document.createElement("p");
        headlineMarquee.innerHTML = marqueeStart + marqueeEnd;
        headlines.appendChild(headlineMarquee);
    },

    renderApod: function(apodPhoto) {
        var apodBox = document.querySelector('#right');
        var apodImage = document.createElement('img');
        apodImage.src = apodPhoto.url;
        apodBox.appendChild(apodImage);

        apodImage.onclick = function() {
            var apodText = document.createElement('p');
            apodText.innerText = apodPhoto.title + ": " + "\n"+ apodPhoto.explanation;
            apodBox.appendChild(apodText);
        }

        apodImage.onmousemove = function() {
            var apodText = document.querySelector('p');
            apodText.innerText = "";
            apodBox.appendChild(apodText);
        }
        
    },

    renderMemo: function(){
        var leftDiv = document.querySelector("#left");
        var memoView = new MemoView(leftDiv);
        memoView.renderMemoDash();
    },

    addResizeListener: function(){
    var leftDiv = document.querySelector("#left");
    var erd = elementResizeDetectorMaker({
    strategy: "scroll"
    });

    erd.listenTo(leftDiv, function(element) {
    var width = element.offsetWidth;
    var opacity = ((width-45)/535);
    leftDiv.style.opacity = opacity;
        });
    },
    renderMapFeatures: function (location) {
        var markerString = "You're here!"
        this.mapWrapper.addInfoMarker(location, markerString, this);
        this.mapWrapper.addAstroMarker(location);
        this.mapWrapper.mapClickChangesWeather(this.weather, this);
    },
    currentLocationButton: function() {
        var button = document.querySelector('#whereami');
        button.onclick = function() {
            this.spaceStation.currentLocation(function(location) {
                this.mapWrapper.clearMarkers();
                this.weather.findWeatherByCoords(location.lat, location.lng, function(newWeather) {
                this.mapWrapper.setCenter(location.lat,location.lng, 4);
                var markerString = "You're here!"
                this.mapWrapper.addInfoMarker(location, markerString, this);
                this.mapWrapper.addAstroMarker(location);
                this.renderMapFeatures();
                this.renderWeather(newWeather);
                }.bind(this))
            }.bind(this));
        }.bind(this)
    },
    renderWeather: function(location) {
        var ul = document.querySelector('#weather');

        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
      };

      var li1 = document.createElement('li');
      if (location.name != "") {
        li1.innerText = "City:  " + location.name 
        li1.style.fontSize = "small";
        ul.appendChild(li1);
            } else {
                li1.innerText = "Over the sea";
                li1.style.fontSize = "small";
                ul.appendChild(li1);
        }

    var li2 = document.createElement('li');
    li2.innerText = "Temp: " + location.main.temp + "C";
    li2.style.fontSize = "small";
    ul.appendChild(li2);

    var li3 = document.createElement('li');
    li3.innerText = location.weather[0].description.charAt(0).toUpperCase() + location.weather[0].description.slice(1) + "   ";
    li3.style.fontSize = "small";
    ul.appendChild(li3);

    var iconImg = document.createElement('img')
    iconImg.src = "http://openweathermap.org/img/w/"              + location.weather[0].icon  + ".png",
    li3.appendChild(iconImg);
    ul.appendChild(li3);
    }
}

module.exports = UI;