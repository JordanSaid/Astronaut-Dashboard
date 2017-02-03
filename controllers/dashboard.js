var express = require('express');
var app = express();
var dashboardRouter = express.Router();
var memoQuery = require('../db/memoQuery')
var query = new memoQuery();


dashboardRouter.get('/', function(req, res){
  query.all(function(results){
    console.log("get all memos");
    res.json(results);
  });
});

module.exports = dashboardRouter;