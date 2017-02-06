var News = require('../models/news');
var MemoView = require('./memoView');
var MapWrapper = require('../models/MapWrapper');
var SpaceStation = require('../models/spaceStation');

var UI = function () {
    this.news = new News();

    this.news.buzzfeedNews(function(buzzArray) {
            this.renderBuzz(buzzArray);
            console.log(buzzArray)
        }.bind(this))
    

    this.news.all(function(headlineArray) {
        this.render(headlineArray);
        console.log(headlineArray)
    }.bind(this))
    this.container = document.body;

    this.spaceStation = new SpaceStation();
    this.spaceStation.currentLocation(function(location) {
        this.renderMap(location);
        this.currentLocationButton();
        console.log(location)
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
           buzzArray.forEach(function(buzz) {
            var buzzTitle = document.createElement("p");
             buzzTitle.innerHTML = "<a href='" + buzz.url + "'>" + "<marquee direction='left'>" + buzz.title + "</marquee></a>";
             headlines.appendChild(buzzTitle);
           });
    },

    render: function (headlinesArray) {
        var headlines = document.querySelector('#ticker');
           headlinesArray.forEach(function(headline) {
             var headlineTitle = document.createElement("p");
             headlineTitle.innerHTML = "<a href='" + headline.url + "'>" + "<marquee direction='left'>" + headline.title + "</marquee></a>";
             headlines.appendChild(headlineTitle);
           });

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

    renderMemo: function(){
    var leftDiv = document.querySelector("#left");
    var memoView = new MemoView(leftDiv);
    memoView.renderMemoDash();
    },

    renderMap: function (location) {
        var container = document.querySelector('#right');
        var mapDiv = document.createElement('div');
        container.appendChild(mapDiv);

        this.mapWrapper = new MapWrapper(mapDiv, location, 4);
        var markerString = "You're soaring over here right now!"
        this.mapWrapper.addInfoMarker(location, markerString);
    },
    currentLocationButton: function() {
        var container = document.querySelector('#right');
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

}

module.exports = UI;