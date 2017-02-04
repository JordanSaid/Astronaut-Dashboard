var ajax = {
   
    get: function (url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url);
        console.log(url)
        request.onload = function () {
            if (this.status !== 200) {
                console.error('Request status:', this.status);
                return;
            }
            var jsonString = this.responseText;
            var data = JSON.parse(jsonString);
            console.log(data)
            callback(data);
        };
        request.send();   
    }
};

module.exports = ajax;