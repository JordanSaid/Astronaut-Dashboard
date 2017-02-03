var MemoView = function(container){
  this.container = container;
};

MemoView.prototype = {

  renderMemoDash: function(){
    console.log(this.container);
    this.container.innerHTML = "";
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
      console.log("search button clicked "+searchBox.value);
    });
    newButton.addEventListener("click",function(){
      console.log("New memo button clicked - Yay")
    })
    this.container.appendChild(controlBar);
    controlBar.appendChild(searchBox);
    controlBar.appendChild(searchButton);
    controlBar.appendChild(space);
    controlBar.appendChild(newButton);
    //shows a search bar, search button
    //and a new memo button
  },

  renderMemo: function(data){
    //render the memo inside this.container
    //and add any data.
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
