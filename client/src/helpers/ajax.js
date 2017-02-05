var ajax = {
   
    makeRequest: function(method, url, callback, payload){
      var request = new XMLHttpRequest();
      request.open(method, url);
      request.setRequestHeader("Content-type", "application/json");
      request.onload = function(){
        if (this.status !== 200) {
            console.error('Request status:', this.status);
            return;
            }
        var jsonString = this.responseText;
        var data = JSON.parse(jsonString);
        callback(data);
      }
      request.send(payload);
    },

    get: function(url, callback) {
        this.makeRequest('GET', url,callback);
    },

    post: function(url,callback,payload){
      var data = JSON.stringify(payload);
        this.makeRequest('POST',url,callback,data);
    }
};

module.exports = ajax;