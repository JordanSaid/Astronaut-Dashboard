var express = require('express');
var app = express();
var dashboardRouter = express.Router();

dashboardRouter.get('/', function(req, res){
  query.all(function(results){
    res.json(results);
  });
});

module.exports = dashboardRouter;