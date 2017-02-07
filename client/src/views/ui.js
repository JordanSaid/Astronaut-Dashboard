var News = require('../models/news');
var Apod = require('../models/apod');
var MemoView = require('./memoView');
var MapWrapper = require('../models/MapWrapper');
var SpaceStation = require('../models/spaceStation');
var Weather = require('../models/weather');


var UI = function () {
    this.news = new News();

    this.news.buzzfeedNews(function(buzzArray) {
            this.renderBuzz(buzzArray);
            // console.log(buzzArray)
        }.bind(this))


    this.news.all(function(headlineArray) {
        this.render(headlineArray);
        // console.log(headlineArray)
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
            this.addMapMarker(location);
            this.currentLocationButton();
            this.renderWeather(weather);
            console.log(weather)
        }.bind(this))
    }.bind(this));

    this.renderMemo();


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
        // console.log(buzzMarquee)
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

        // var leftDiv = document.querySelector("left-div");
        // var memoView = new MemoView(leftDiv);
        // memoView.renderMemoDash();

        // var headerContainer = this.createContainer('header', 'flex', 'center', 'shadow');
        // new Header(headerContainer);
        // var searchBar = new SearchBar(headerContainer);

        // var imageContainer = this.createContainer('image-container', 'flex', 'wrap', 'center');
        // var imageDisplay = new ImageDisplay(imageContainer);
        // searchBar.setImageContainer(imageDisplay);
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
    addMapMarker: function (location) {
        var markerString = "You're soaring over here right now!"
        this.mapWrapper.addInfoMarker(location, markerString);
        this.mapWrapper.mapClickChangesWeather();
    },
    currentLocationButton: function() {
        var container = document.querySelector('#centre');
        var button = document.createElement('button');
        button.innerText = "Where Am I?"
        container.appendChild(button);
        button.onclick = function() {
            this.spaceStation.currentLocation(function(location) {
                this.mapWrapper.setButtonClickNewCenter(button, location, 5);
                console.log(location)
            }.bind(this))
        }.bind(this);
    },
    renderWeather: function(location) {
        var container = document.querySelector('#centre');
        var ul = document.createElement('ul');
        container.appendChild(ul);

        var cityLi = document.createElement('li');
        cityLi.innerText = "City: " + location.name;
        ul.appendChild(cityLi);

        var tempLi = document.createElement('li');
        tempLi.innerText = "Temp: " + location.main.temp + "C";
        ul.appendChild(tempLi);

        var descriptionLi = document.createElement('li');
        descriptionLi.innerText = location.weather[0].description.charAt(0).toUpperCase() + location.weather[0].description.slice(1);
        ul.appendChild(descriptionLi);

        var iconLi = document.createElement('li');
        var iconImg = document.createElement('img')
        iconImg.src = "http://openweathermap.org/img/w/"
              + location.weather[0].icon  + ".png",
        ul.appendChild(iconLi);
        iconLi.appendChild(iconImg);

    }
}

module.exports = UI;