var assert = require("assert");
var memo = require("./memo");

var options = {
  title: "My memo",
  body: "Hello diary"
  emoji: {
    name: "smiley"
    url: "urlforsmiley"
  }
};

Describe ("Memo", function(){
  beforeEach(function(){
    memo = new Memo(options);
  })
})