var Memo = function(options){
  this._id = options._id;
  this.title = options.title;
  this.timestamp = options.timestamp;
  this.date = options.date;
  this.body = options.body;
  this.emoji = options.emoji;
};

Memo.prototype = {

};

module.exports = Memo;