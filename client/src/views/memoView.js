var MemoView = function(container){
  this.container = container;
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
      

      console.log("search button clicked "+searchBox.value);
    });
    newButton.addEventListener("click",function(){
      //going to show a new memo here
      this.renderMemo();
      
    }.bind(this))
    this.container.appendChild(controlBar);
    controlBar.appendChild(searchBox);
    controlBar.appendChild(searchButton);
    controlBar.appendChild(space);
    controlBar.appendChild(newButton);
    //shows a search bar, search button
    //and a new memo button
  },

  renderMemo: function(data){
    //we want a heading with space for name, date and save
    this.container.innerHTML = "";
    this.container.style.flexDirection = "column";
    var headerBar = document.createElement("section");
    headerBar.setAttribute("id","control-bar");
    var memoBody = document.createElement("textarea");
    memoBody.setAttribute("id","memo-body");
    memoBody.rows = "8";
    console.log(memoBody.rows);
    this.container.appendChild(headerBar);
    this.container.appendChild(memoBody);
  },

  renderMemoIndex: function(data){
    //render the memo index list inside this container
    //and add the names of matching memos
  },

  getMemo: function (id) {
      ajax.get(url, function (data) {
        console.log(data);
        // if id is null just render a blank memo 
         // container.render(data);
      });
  },

  searchMemo: function (searchBy, seachData) {
      ajax.get(url, function (data) {
        console.log(data);
        // if id is null just render a blank memo 
         // container.render(data);
      });
  }
};

module.exports = MemoView;
