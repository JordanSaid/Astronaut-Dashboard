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