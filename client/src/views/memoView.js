var MemoView = function(container){
  this.container = container;
};

MemoView.prototype = {

  renderMemoDash: function(){
    this.container.innerHTML = "";
    var controlBar = document.createElement("div");
    controlBar.setAttribute("id","control-bar");
    this.container.appendChild(controlBar);
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

  searchMemo: function (searchBy, seachData, ) {
      ajax.get(url, function (data) {
        console.log(data);
        // if id is null just render a blank memo 
         // container.render(data);
      });
  }


};

