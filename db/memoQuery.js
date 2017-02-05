var MongoClient = require('mongodb').MongoClient;

var MemoQuery = function(){ //NEW
  this.url = 'mongodb://localhost:27017/dashboard';
}

MemoQuery.prototype = {
  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db) {
      if(db){
        var collection = db.collection('memos'); 
        collection.find().toArray(function(err, docs) {
          console.log(docs);
          onQueryFinished(docs);
        });
      }
    });
  },
  
  // add: function(memoToAdd, onQueryFinished) {  
  //   console.log(this.url);
  //   MongoClient.connect(this.url, function(err, db) {
  //     if(db){
  //         var collection = db.collection('memos');
  //         collection.insert(memoToAdd);
  //         collection.find().toArray(function(err, docs) {
  //         onQueryFinished(docs);
  //         });
  //       };
  //   });
  // },


  add: function(memoToAdd, onQueryFinished) {  
    console.log(this.url);
    MongoClient.connect(this.url, function(err, db) {
      if(db){
          var collection = db.collection('memos');
          var memoId = memoToAdd._id;
          if (memoId === undefined){
            console.log("undefined id")
          collection.save(memoToAdd);  
          }else
          {
          console.log("id was found")
          collection.update({_id: memoToAdd._id},memoToAdd,{upsert:true});
          }
          collection.find().toArray(function(err, docs) {
          console.log("docs below")
          console.log(docs);
          onQueryFinished(docs);
          });
        };
    });
  },

}

module.exports = MemoQuery;