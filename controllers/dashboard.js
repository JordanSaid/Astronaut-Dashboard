var express = require('express');
var app = express();
var dashboardRouter = express.Router();
var memoQuery = require('../db/memoQuery')
var query = new memoQuery();


dashboardRouter.get('/', function(req, res){
    console.log("memos route")
    query.all(function(results){
    res.json(results);
  });
});

dashboardRouter.post('/', function(req, res){
    query.add(req.body,function(docs){
    var length = docs.length;
    var returnedId = JSON.stringify(docs[length-1]);
    res.json({data: returnedId});
  })
});



module.exports = dashboardRouter;