var Memo = require('./memo');
var ajax = require("../helpers/ajax")

var Memos = function(){

}

Memos.prototype = {

  makeRequest: function(method, url, callback, payload){
    var request = new XMLHttpRequest();
    request.open(method, url);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = callback;
    request.send(payload);
  },
  
  all: function(url,callback){
    var results;
    this.makeRequest("GET", "http://localhost:3000/memos", function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      results = JSON.parse(jsonString);
      callback(results);
    });
  },

  populateMemos: function(results){
    var memos = [];
    
    for(var result of results){
      var memo = new Memo(result);
      memos.push(memo);
    }
    return memos;
    console.log("memos returned: ")
    console.log(memos);
  },

  add: function(newMemo, callback){
    var memoToAdd = JSON.stringify(newMemo);
    console.log("NEW Memo", memoToAdd);
    this.makeRequest("POST", "http://localhost:3000/memos", callback, memoToAdd);
  },

  search: function(searchBy, searchData){
    var data = [];
     this.makeRequest("GET", "http://localhost:3000/",function(){
        var jsonString = this.responseText;
        data = JSON.parse(jsonString);
      });
    console.log(data);

  }

};

// module.exports = Memos;