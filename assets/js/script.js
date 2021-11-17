var lat = "";
var lon = "";
var minLat = "";
var maxLat = "";
var minLon = "";
var maxLon = "";
var openWeatherMapAPIkey = "126fddb2bf227e0327010f96d6495a39";
var openTripAPIkey = "5ae2e3f221c38a28845f05b6e3685209113606efb34325fcaaa0fedf";
var barsAPIkey = "13fc1e92ecdb7058d390ee18ec3795b8";


// this function gets latitude and longitude values that are then altered to get min and max values for each, and those are passed into fetchAccomodations to call openTrip API
var getLatLon = function(userInput) {
    var getLatLonUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&units=imperial&appid=" + openWeatherMapAPIkey;

    fetch(getLatLonUrl)
    .then(function(response) {
        $.ajax({
            url: getLatLonUrl,
            type: "POST",
            statusCode: {
                404: function() {
                    alert('"' + userInput + '"' + " is not a valid City name. Please try again!");
                    return;
                }
            }
        });
        return response.json();
    }).then(function(data) {
        console.log(data);
        lat = data.coord.lat;
        lon = data.coord.lon;
        minLat = lat - 0.25;
        maxLat = lat + 0.25;
        minLon = lon - 0.25;
        maxLon = lon + 0.25;
        fetchBars(lat, lon);
        fetchAccomodations(minLat, maxLat, minLon, maxLon);
    });
};

// results from getLatLon() is passed into this function to make API call
var fetchAccomodations = function() {
    var accomodationsURL = "https://api.opentripmap.com/0.1/en/places/bbox?lon_min=" + minLon + "&lon_max=" + maxLon + "&lat_min=" + minLat + "&lat_max=" + maxLat + "&kinds=accomodations&format=json&limit=10&apikey=" + openTripAPIkey;

    fetch(accomodationsURL)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        displayAccomodations(data);
        return data;
    });
};

// results from getLatLon() are passed into this function to make API call
var fetchBars = function(){
    var barURL = "https://api.documenu.com/v2/restaurants/search/geo?lat=" + lat + "&lon=" + lon + "&distance=1&size=10&key=" + barsAPIkey;

    fetch(barURL)
    .then(function(response) {console.log(response);
        return response.json();
    }).then(function(data) {console.log(data);
        displayBars(data);
        return data;
    });
};

// this function dynamcially creates elements on the page from accomodations API data
var displayAccomodations = function(data) {
    for (var i = 0; i < data.length; i++) {
        var accomodationName = data[i].name;
        
        var accomodationEl = $("<li>").addClass().text(accomodationName);
        $("#accomodationList").append(accomodationEl);
    };
};

// this function dynamcially creates elements on the page from bar/restaurant API data
var displayBars = function(data) {
    for (var i = 0; i < data.data.length; i++) {
        var barName = data.data[i].restaurant_name;
        
        var barEl = $("<li>").addClass().text(barName);
        $("#barList").append(barEl);
    };
};

// when search button is clicked, destination field text is passed into getLatLon()
$("#search").click(function(event) {
    event.preventDefault();

    userInput = $("#destinationInput").val();
    getLatLon(userInput);
    $("#destinationInput").val("");
});
