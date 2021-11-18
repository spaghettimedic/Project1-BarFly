var lat = "";
var lon = "";
var minLat = "";
var maxLat = "";
var minLon = "";
var maxLon = "";
var barFlyCities = [];
var openWeatherMapAPIkey = "126fddb2bf227e0327010f96d6495a39";
var openTripAPIkey = "5ae2e3f221c38a28845f05b6e3685209113606efb34325fcaaa0fedf";
var barsAPIkey = "13fc1e92ecdb7058d390ee18ec3795b8";


var loadBarFlyCities = function() {
    // get barFlyCities array from localStorage, or initialize it in localStorage if it doesn't exist (first use of application, or user manually cleared their localStorage)
    barFlyCities = JSON.parse(localStorage.getItem("barFlyCities") ?? "[]");
    // clear all city buttons so they can be regenerated without being repeated
    $("#cityBtnContainer").html("");

    // create for loop to create button elements for each city in barFlyCities array
    for (var i = 0; i < barFlyCities.length; i++) {
        var cityName = barFlyCities[i];
        displayCityButtons(cityName);
    };
};

// this function gets latitude and longitude values that are then altered to get min and max values for each, and those are passed into fetchAccommodations to call openTrip API
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
        lat = data.coord.lat;
        lon = data.coord.lon;
        minLat = lat - 0.25;
        maxLat = lat + 0.25;
        minLon = lon - 0.25;
        maxLon = lon + 0.25;
        fetchBars(lat, lon);
        fetchAccommodations(minLat, maxLat, minLon, maxLon);
    });
};

var displayCityButtons = function(userInput) {

    barFlyCities.push(userInput);

    // check if there are any duplicate cities and remove them from barFlyCities
    var filteredbarFlyCities = barFlyCities.filter((item, index) => barFlyCities.indexOf(item) === index);
    barFlyCities = filteredbarFlyCities;
    if (barFlyCities.length > 5) {
        barFlyCities = barFlyCities.slice(1)
    };

    localStorage.setItem("barFlyCities", JSON.stringify(barFlyCities));
    $("#cityBtnContainer").empty();

    for (var i = 0; i < barFlyCities.length; i++) {
        var cityBtnEl = $("<button>").addClass("button success").text(barFlyCities[i]);
        $("#cityBtnContainer").append(cityBtnEl);
    }
};

// results from getLatLon() is passed into this function to make API call
var fetchAccommodations = function() {
    var accommodationsURL = "https://api.opentripmap.com/0.1/en/places/bbox?lon_min=" + minLon + "&lon_max=" + maxLon + "&lat_min=" + minLat + "&lat_max=" + maxLat + "&kinds=accomodations&format=json&limit=10&apikey=" + openTripAPIkey;

    fetch(accommodationsURL)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        displayAccommodations(data);
        return data;
    });
};

// results from getLatLon() are passed into this function to make API call
var fetchBars = function(){
    var barURL = "https://api.documenu.com/v2/restaurants/search/geo?lat=" + lat + "&lon=" + lon + "&distance=1&size=10&key=" + barsAPIkey;

    fetch(barURL)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        displayBars(data);
        return data;
    });
};

// this function dynamcially creates elements on the page from accommodations API data
var displayAccommodations = function(data) {
    for (var i = 0; i < data.length; i++) {
        var accommodationName = data[i].name;
        
        var accommodationEl = $("<button>").addClass("button warning").html("<a href='https://www.google.com/search?q=" + accommodationName + "' target='_blank'>" + accommodationName + "</a>");
        $("#accommodationList").append(accommodationEl);
    };
};

// this function dynamcially creates elements on the page from bar/restaurant API data
var displayBars = function(data) {
    for (var i = 0; i < data.data.length; i++) {
        var barName = data.data[i].restaurant_name;
        
        var barEl = $("<button>").addClass("button warning").html("<a href='https://www.google.com/search?q=" + barName + "' target='_blank'>" + barName + "</a>");
        $("#barList").append(barEl);
    };
};

// when search button is clicked, destination field text is passed into getLatLon()
$("#search").click(function(event) {
    event.preventDefault();

    userInput = $("#destinationInput").val();
    getLatLon(userInput);
    displayCityButtons(userInput);
    $("#destinationInput").val("");
    $("#accommodationList").empty();
    $("#barList").empty();
});
