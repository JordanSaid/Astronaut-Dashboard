var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/memos',require('./dashboard'));

router.get('/', function(req, res) {
  console.log('index route /')
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));

});

module.exports = router;