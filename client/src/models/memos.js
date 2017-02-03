var Memo = require('./memo');


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
  
  all: function(callback){
    var self = this;
    this.makeRequest("GET", "http://localhost:3000/api/dashboard", function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var results = JSON.parse(jsonString);
      var memos = self.populateMemos(results);
      callback(memos);
    });
  },

  populateMemos: function(results){
    var memos = [];
    
    for(var result of results){
      var memo = new Memo(result);
      memos.push(memo);
    }
    return memos;
  },

  add: function(newMemo, callback){
    var memoToAdd = JSON.stringify(newMemo;
    console.log("NEW Memo", memoToAdd);
    this.makeRequest("POST", "http://localhost:3000/api/dashboard", callback, memoToAdd);
  },

  search: function(searchBy, searchData, onQueryFinished){
    MongoClient.connect(this.url, function(err, db) {
    if(db){
      var collection = db.collection('memos');
      // search collection on supplied key for data
      
      };
    });
  }

};

module.exports = Memos;