var assert = require("assert");
var Memo = require("../memo");

var memo;
var options = {
  title: "My memo",
  body: "Hello diary",
  emoji: {
    name: "smiley",
    url: "urlforsmiley"
  }
};

describe ("Memo", function(){

  beforeEach(function(){
    memo = new Memo(options);
  });

  it("should have a name",function(){
    assert.equal("My memo",memo.title);
  });
  
  it("should have a body",function(){
    assert.equal("Hello diary", memo.body);
  });

  it("should have an emoji name",function(){
    assert.equal("smiley",memo.emoji.name);
  });

  it("should have an emoji url",function(){
    assert.equal("urlforsmiley",memo.emoji.url);
  });
})