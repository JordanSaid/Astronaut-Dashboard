var News = function() {
}

News.prototype = {
  makeRequest: function(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = callback;
    request.send();
  },
  all: function(callback) {
    var self = this;
    this.makeRequest("https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=fab20889cd4f496eaebc7399e6c081a2", function() {
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      headlines = JSON.parse(jsonString);
      var headlineArray = headlines.articles;
      callback(headlineArray);
    })
  },
  buzzfeedNews: function(callback) {
    var self = this;
    this.makeRequest("https://newsapi.org/v1/articles?source=buzzfeed&sortBy=top&apiKey=fab20889cd4f496eaebc7399e6c081a2", function() {
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      buzzfeed = JSON.parse(jsonString);
      var buzzArray = buzzfeed.articles;
      callback(buzzArray);
    })
  }
}

module.exports = News;