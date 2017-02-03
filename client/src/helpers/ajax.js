var ajax = {
   
    get: function (url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url);
        
        request.onload = function () {
            if (this.status !== 200) {
                console.error('Request status:', this.status);
                return;
            }

            var jsonString = this.responseText;
            var data = JSON.parse(jsonString).data;
            callback(data);
        }
        
        request.send();   
    }
}
