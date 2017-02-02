var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

router.use(require('./dashboard'));

router.get('/', function(req, res) {
  console.log('index route /')
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));

});

module.exports = router;