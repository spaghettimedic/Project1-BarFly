var getLatLon = function(userInput) {
    var getLatLonUrl = "https://api.documenu.com/v2/restaurants/search/geo?key=13fc1e92ecdb7058d390ee18ec3795b8&" + userInput + "&distance=1&fullmenu"
    fetch(getLatLonUrl)
    .then(function(response) {
        //$.ajax({
           // url: getLatLonUrl,
            //type: "POST",
            //statusCode: {
                //404: function() {
                    //alert('"' + userInput + '"' + " is not a valid City name. Please try again!");
                    //return;
                //}
            //}
        //});
        return response.json();
    }).then(function(data) {
        console.log(data);
        
    })
};

getLatLon("lat=40.688072&lon=-73.997385");