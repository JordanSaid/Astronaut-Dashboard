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
  console.log("post new memos route");
  query.add(req.body,function(){

  })
  res.json({data: "hello"});
});



module.exports = dashboardRouter;