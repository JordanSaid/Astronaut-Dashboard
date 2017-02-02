var MongoClient = require('mongodb').MongoClient;

var MemoQuery = function(){ //NEW
  this.url = 'mongodb://localhost:27017/dashboard';
  console.log("creating new memo query");
}

MemoQuery.prototype = {
  all: function(onQueryFinished){
    console.log("in memoQuery.all")
    MongoClient.connect(this.url, function(err, db) {
      if(db){
        console.log("in if-db function");
        var collection = db.collection('memos'); 
        collection.find().toArray(function(err, docs) {
          console.log(docs);
          onQueryFinished(docs);
        });
      }
    });
  },
  add: function(memoToAdd, onQueryFinished) {  
    MongoClient.connect(this.url, function(err, db) {
      if(db){
          var collection = db.collection('memos');
          collection.insert(memoToAdd);
          collection.find().toArray(function(err, docs) {
            console.log(docs);
            onQueryFinished(docs);
          });
        };
    });
  }
}

module.exports = MemoQuery;