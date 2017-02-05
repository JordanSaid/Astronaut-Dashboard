var News = require('../models/news');
var MemoView = require('./memoView')
var MapWrapper = require('../models/MapWrapper');
var SpaceStation = require('../models/spaceStation');

var UI = function () {
    this.news = new News();
    this.news.all(function(headlineArray) {
        this.render(headlineArray);
        console.log(headlineArray)
    }.bind(this))
    this.container = document.body;

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
             headlineTitle.innerHTML = "<a href='" + headline.url + "'>" + "<marquee direction='left'>" + headline.title + "</marquee></a>";
             headlines.appendChild(headlineTitle);
           });
        var leftDiv = document.querySelector("#left");
        var memoView = new MemoView(leftDiv);
        memoView.renderMemoDash();

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

    renderMap: function (detailsArray) {
        var mapDiv = document.querySelector('#right');
        var stationLat = detailsArray.iss_position.latitude;
        var stationLon = detailsArray.iss_position.longitude;
        var spaceStationLocation = {lat: parseInt(stationLat), lng: parseInt(stationLon)};
        this.mapWrapper = new MapWrapper(mapDiv, spaceStationLocation, 4);
        this.mapWrapper.addMarker(spaceStationLocation);
    }


}

module.exports = UI;