var flatpickr = require("flatpickr");
require("flatpickr/dist/flatpickr.min.css");
var Memo = require('../models/memo');
var ajax = require("../helpers/ajax");
var Emoji = require('../models/emoji');
var searchResult = [];

var MemoView = function(container){
  this.container = container;
  this.memo = {};
};
MemoView.prototype = {

  renderMemoDash: function(){
    this.clearMemoForm();
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
    newButton.innerText = "New";
    searchButton.addEventListener("click",function(){this.startSearch(searchBox.value);
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
    this.clearMemoForm()
    var id = null;
    if (data._id != null){
      id = data._id}
      var timestamp = data.timestamp;
      this.container.style.flexDirection = "column";
      this.emoji = data.emoji;
      var headerBar = document.createElement("section");
      headerBar.setAttribute("id","control-bar");
      var dateBox = document.createElement("input");
      dateBox.type = "text";
      dateBox.setAttribute("id","date-box");
      dateBox.value = data.date;
      var titleBox = document.createElement("input");
      titleBox.setAttribute("id","title-box");
      titleBox.value = data.title;
      var emojiBox = document.createElement("select");
      emojiBox.setAttribute("id","emoji-box");
    
      var select = document.createElement("option");
      select.innerHTML = "😀";
      emojiBox.appendChild(select);
      select = document.createElement("option");
      select.innerHTML = "😟";
      emojiBox.appendChild(select);
      select = document.createElement("option");
      select.innerHTML = "😢";
      emojiBox.appendChild(select);
      select = document.createElement("option");
      select.innerHTML = "😡";
      emojiBox.appendChild(select);
    
      if (data.emoji){
      console.log(data.emoji)
      emojiBox.value = data.emoji.name};
      
      emojiBox.addEventListener("change",function(){
        this.memo.emoji.name = emojiBox.value;
      }.bind(this))
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
        if ((memoBody.value != "")&&(titleBox.value != "New Memo")){
          if (id != null){
            this.memo["_id"] = id;
          }
          console.log(this.memo);  
          this.memo["title"] = titleBox.value;
          this.memo["body"] = memoBody.value;
          this.memo["timestamp"] = timestamp;
          this.memo["date"] = dateBox.value;
          this.postMemo(this.memo,function(data){
          }.bind(this));
        }
      this.renderMemoDash();
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
          this.postMemo(this.memo,function(data){
          var justPosted = JSON.parse(data.data);
          if (justPosted._id != null){
          this.memo["_id"] = justPosted._id;}
          }.bind(this));
        }
      }.bind(this));
    this.container.appendChild(memoBody);
    this.container.appendChild(footerBar);
  },

  renderMemoIndex: function(data){
    this.container.style.flexDirection = "column";
    var resultDiv = document.querySelector("#index-div");
    if (resultDiv == null){      
      resultDiv = document.createElement("section");
      resultDiv.setAttribute("id","index-div");
      this.container.appendChild(resultDiv);
    }
    resultDiv.innerHTML = "";
    var listDiv = document.createElement("div");
    listDiv.setAttribute("id","list-div");
    resultDiv.appendChild(listDiv);
    var ul = document.createElement("ul");
    ul.setAttribute("id","index-list");
    listDiv.appendChild(ul);
    var li;
    var space;
    var delButton;
    for (var i=0;i<data.length;i++){
      li = document.createElement("li");
      li.setAttribute("id",i)
      li.innerText = data[i].title;
      ul.appendChild(li);
      space = document.createElement("section");
      space.className = "space"
      space.setAttribute("id",i);
      li.appendChild(space);
      delButton = document.createElement('button');
      delButton.className = "deleteButton"
      delButton.setAttribute("id",i);
      delButton.innerText = "Delete"
      li.appendChild(delButton);
    }
  ul.addEventListener("click",function(event){
    var target = event.target.id
    if (event.target.nodeName == "BUTTON"){
      var searchBox = document.querySelector("#search-box");
      var oldQuery = searchBox.value;
      console.log(oldQuery);
      var retVal = confirm("Delete memo "+data[target].title+"?");
      if (retVal = true){
        this.deleteMemo(data[target],function(data){
          this.startSearch(oldQuery);
          }.bind(this));
        }
      }else
      {
        this.renderMemo(data[target]);
      }
    }.bind(this)); 
  },
  clearMemoForm: function(){
    var i = 0;
    while (i < this.container.children.length){
      childNode = this.container.children[i];
      if (childNode.id != ""){
        this.container.removeChild(childNode);
      }else i++;
      
    };
    
},

startSearch: function(query){
  searchResult = [];
    this.parseSearch(query,function(){
      if (searchResult.length > 0){
      this.renderMemoIndex(searchResult);} else
      {
        var resultDiv = document.querySelector("#index-div");
        if (resultDiv != undefined){resultDiv.innerHTML = ""}
      }
  }.bind(this));
},

parseSearch: function(query,callback){
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
  searchMemo: function (searchBy, searchData,callback) {
        var url = "http://localhost:3000/memos/"        
        ajax.get(url, function (data) {
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
    ajax.post(url,function(data){
      callback(data);
    },memoToAdd);
  },
  deleteMemo: function(memoToDelete,callback){
    var url = "http://localhost:3000/memos/";
    ajax.delete(url,function(data){
      callback(data);
    },memoToDelete);
  }
};
 module.exports = MemoView;