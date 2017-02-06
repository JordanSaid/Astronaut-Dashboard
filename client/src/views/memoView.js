var flatpickr = require("flatpickr");
require("flatpickr/dist/flatpickr.min.css");
var Memo = require('../models/memo');
var Memos = require('../models/memos');
var ajax = require("../helpers/ajax");
var Emoji = require('../models/emoji');
var searchResult = [];
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
      searchResult = [];
      this.parseSearch(searchBox.value,function(){
        console.log("callback")
        if (searchResult.length > 0){
        this.renderMemoIndex(searchResult);}
      }.bind(this));
    }.bind(this));
    newButton.addEventListener("click",function(){
      var options = {};
      options["title"] = "New memo";
      var timestamp = new Date(Date.now());
      options["timestamp"] = timestamp;
      options["date"] = timestamp.toDateString();
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
    var id = null;
    if (data._id != null){
    console.log(data._id);
    id = data._id}
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
    dateBox.value = data.date;
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
      if (id != null){
        this.memo["_id"] = id;
      }
      this.memo["title"] = titleBox.value;
      this.memo["body"] = memoBody.value;
      this.memo["timestamp"] = timestamp;
      this.memo["date"] = dateBox.value;
      this.memo["emoji"] = {};
      this.postMemo(this.memo,function(data){
        this.renderMemoDash();
      }.bind(this));
    }.bind(this));

    saveButton.addEventListener("click",function(){
      if (memoBody.value != ""){
        if (id != null){
          this.memo["_id"] = id;
        }
      this.memo["title"] = titleBox.value;
      this.memo["body"] = memoBody.value;
      this.memo["date"] = dateBox.value;      
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
    console.log("render memo index")
    console.log(this.container);

    this.container.style.flexDirection = "column";
    var resultDiv = document.querySelector("#index-div");
    if (resultDiv == null){      
    resultDiv = document.createElement("section");
    resultDiv.setAttribute("id","index-div");
    this.container.appendChild(resultDiv);
    }
    resultDiv.innerHTML = "";
    var ul = document.createElement("ul");
    ul.setAttribute("id","index-list");
    resultDiv.appendChild(ul);
    var li;
    console.log(data)
    for (var i=0;i<data.length;i++){
      li = document.createElement("li");
      li.setAttribute("id",i)
      li.innerText = data[i].title;
      ul.appendChild(li);
    }
  ul.addEventListener("click",function(event){
    var target = event.target.id;
    this.renderMemo(data[target]);
    }.bind(this))  
  },

  parseSearch: function(query,callback){
    //things to search on: date, title, body
    //if we have / then it's probably a date
    var searchString = query.toLowerCase();
    var searchParam = ""; 
    if (searchString.indexOf('date')>-1){
    searchString = searchString.replace(/date/g,'');
    searchParam = "date";
    searchString = searchString.replace(/\//g,'-')   
    }
    else
    {
    if (searchString.indexOf("body") > -1){
    searchString = searchString.replace(/body/,"");
    searchParam = "body";
      } else
    if (searchString.indexOf("title") > -1){
    searchString = searchString.replace(/title/,"");
    searchParam = "title";
      }   
    }
  searchString = searchString.replace(/=/g,"")  
  searchString = searchString.replace(/^\s+|\s+$/g, ""); 
  this.searchMemo(searchParam,searchString,callback);  
  },

  getMemo: function (id) {
      var memos = new Memos();
      var url = "http://localhost:3000/memos/"
      memos.all(url, function (data) {
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

  searchMemo: function (searchBy, searchData,callback) {
        var memos = new Memos();
        var url = "http://localhost:3000/memos/"        
        memos.all(url, function (data) {
        //this is a bad way to search!
        //should be sending query to database
        //lets get something working first
        console.log(searchBy);
        if (data.length > 0){
        for (memo of data){
          if (searchBy == "date"){
            data = memo.date;
          }else
          if (searchBy == "title"){
            data = memo.title.toLowerCase();
          }else
          if (searchBy == "body"){
            data = memo.body.toLowerCase();
          }
      if (data.indexOf(searchData) > -1){
        searchResult.push(memo);
          }
        }
      }
    callback(searchResult)  
      }); 
  },

  postMemo: function(memoToAdd,callback){
    var url = "http://localhost:3000/memos/";
    console.log("post memo function")
    console.log(memoToAdd)
    ajax.post(url,function(data){
      callback(data);
    },memoToAdd);
  }
};

module.exports = MemoView;
