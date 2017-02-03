var MemoView = function(container){

};

MemoView.prototype = {


  getMemo: function (id) {
      ajax.get(url, function (data) {
        console.log(data);
         // container.render(data);
      });
  }

};