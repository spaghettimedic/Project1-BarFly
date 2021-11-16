// Bar name, address and phone #

var getCityBars = function(zip_code){
    //format the documenu url
    var apiUrl = "https://api.documenu.com/v2/restaurants/zip_code/"+zip_code+"?key=13fc1e92ecdb7058d390ee18ec3795b8";

    fetch (apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data)
        });
    });
};

getCityBars("48209");