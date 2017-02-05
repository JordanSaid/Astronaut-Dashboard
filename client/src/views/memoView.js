var flatpickr = require("flatpickr");
require("flatpickr/dist/flatpickr.min.css");
var Memos = require('../models/memos');
var Memo = require('../models/memo');
var ajax = require("../helpers/ajax");
var Emoji = require('../models/emoji');
//flatpickr('#flatpickr-tryme');


var MemoView = function(container){
  this.container = container;
  this.memo = {};
};

MemoView.prototype = {

  renderMemoDash: function(){
    this.container.innerHTML = "";
    this.container.style.flexDirection = "row";
    var controlBar = document.createElement("section");
    controlBar.setAttribute("id","control-bar");
    var searchBox = document.createElement("input");
    searchBox.setAttribute("id","search-box");
    var searchButton = document.createElement("button");
    searchButton.setAttribute("id","search-button");
    searchButton.innerText = "Search";
    var space = document.createElement("p");
    space.setAttribute("id","search-bar-space");
    var newButton = document.createElement("button");
    newButton.setAttribute("id","new-button");
    newButton.innerText = "New memo";
    searchButton.addEventListener("click",function(){
      //going to search here
      this.parseSearch(searchBox.value);

    }.bind(this));
    newButton.addEventListener("click",function(){
      var options = {};
      options["title"] = "New memo";
      var timestamp = new Date(Date.now());
      options["timestamp"] = timestamp;
      options["emoji"] = {"name":"none", "url":""}
      options["body"] = "";
      this.memo = new Memo(options)
      this.renderMemo(this.memo);
      
    }.bind(this));
    this.container.appendChild(controlBar);
    controlBar.appendChild(searchBox);
    controlBar.appendChild(searchButton);
    controlBar.appendChild(space);
    controlBar.appendChild(newButton);
  },

  renderMemo: function(data){
    //the data will contain the info about the memo
    //if there isn't any then it's a new memo
    var timestamp = data.timestamp;
    this.container.innerHTML = "";
    this.container.style.flexDirection = "column";
    this.emoji = data.emoji;
    var headerBar = document.createElement("section");
    headerBar.setAttribute("id","control-bar");
    var dateBox = document.createElement("input");
    dateBox.class = "flatpickr";
    dateBox.type = "text";
    dateBox.setAttribute("id","date-box");
    dateBox.value = timestamp.toDateString();
    var titleBox = document.createElement("input");
    titleBox.setAttribute("id","title-box");
    titleBox.value = data.title;
    var emojiBox = document.createElement("img");
    emojiBox.setAttribute("id","emoji-box");
    if (data.emoji){
    emojiBox.src = data.emoji.url;}

    var memoBody = document.createElement("textarea");
    memoBody.setAttribute("id","memo-body");
    memoBody.rows = "8";
    memoBody.value = data.body;
    var footerBar = document.createElement("section");
    footerBar.setAttribute("id","footer-bar");
    var saveButton = document.createElement("button");
    saveButton.setAttribute("id","save-button");
    saveButton.innerText = "Save";
    var finishButton = document.createElement("button");
    finishButton.setAttribute("id","finish-button");
    finishButton.innerText = "Finish"
    this.container.appendChild(headerBar);
    headerBar.appendChild(titleBox);
    headerBar.appendChild(emojiBox);
    footerBar.appendChild(finishButton);
    footerBar.appendChild(dateBox);
    footerBar.appendChild(saveButton);

    finishButton.addEventListener("click",function(){
      //this saves the memo if it hasn't been
      //and closes the form, returning to the memodash
      this.memo["title"] = titleBox.value;
      this.memo["body"] = memoBody.value;
      this.memo["timestamp"] = timestamp;
      this.memo["emoji"] = {};
      this.postMemo(this.memo,function(data){
        this.renderMemoDash();
      }.bind(this));
    }.bind(this));

    saveButton.addEventListener("click",function(){
      if (memoBody.value != ""){
      this.memo["title"] = titleBox.value;
      this.memo["body"] = memoBody.value;
      this.memo["timestamp"] = timestamp;
      this.memo["emoji"] = {};
      this.postMemo(this.memo,function(data){
      var justPosted = JSON.parse(data.data);
      if (justPosted._id != null){
      this.memo["_id"] = justPosted._id;}
      console.log(justPosted);
      }.bind(this));
    }
  }.bind(this));
    dateBox.addEventListener("click",function(){
          dateBox.flatpickr();
    })
    this.container.appendChild(memoBody);
    this.container.appendChild(footerBar);
 
  },

  renderMemoIndex: function(data){
    //render the memo index list inside this container
    //and add the names of matching memos

  },

  parseSearch: function(query){
    //things to search on: date, title, body
    //if we have / then it's probably a date
    var numberArray = ['/','0','1','2','3','4','5','6','7','8','9'];
    var datePos = query.indexOf('date');
    if (datePos>-1){
      console.log("probably a date");
    // take out duff characters
    var dateString = "";
    for (var i = datePos+4; i < query.length;i++){
      if (numberArray.indexOf(query[i]) != -1 ){
        dateString+= query[i];
        }
      }
    console.log("the search date is "+dateString);  
    }
  //else
  },

  getMemo: function (id) {
      var memos = new Memos();
      var url = "http://localhost:3000/memos/"
      memos.all(url, function (data) {
        console.log("getMemoById")
        console.log(data[0]);
      var memoBody = document.querySelector("#memo-body");
      var memoTitle = document.querySelector("#title-box");
      var dateBox = document.querySelector("#date-box");
      memoTitle.value = data[0].name;
      dateBox.value = data[0].timestamp;
      memoBody.value = data[0].body;
        // if id is null just render a blank memo 
         // container.render(data);
      });
  },

  searchMemo: function (searchBy, seachData) {
        var memos = new Memos();
        var url = "http://localhost:3000/memos/"        
        memos.all(url, function (data) {
          console.log("search Memos")
          console.log(data);
          // if id is null just render a blank memo 
           // container.render(data);
      });
  },

  postMemo: function(memoToAdd,callback){
    var url = "http://localhost:3000/memos/";
    ajax.post(url,function(data){
      callback(data);
    },memoToAdd);
  }
};

module.exports = MemoView;
