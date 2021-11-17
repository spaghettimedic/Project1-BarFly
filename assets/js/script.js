var lat = "";
var lon = "";
var minLat = "";
var maxLat = "";
var minLon = "";
var maxLon = "";
var openWeatherMapAPIkey = "126fddb2bf227e0327010f96d6495a39";
var openTripAPIkey = "5ae2e3f221c38a28845f05b6e3685209113606efb34325fcaaa0fedf";


// this function gets latitude and longitude values that are then altered to get min and max values for each, and those are passed into fetchAmusements to call openTrip API
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
        fetchAmusements(minLat, maxLat, minLon, maxLon);
    })
};

// results from getLatLon() is passed into this function to make API call - the data from the call is passed into dispalyAmusements()
var fetchAmusements = function() {
    var amusementsURL = "https://api.opentripmap.com/0.1/en/places/bbox?lon_min=" + minLon + "&lon_max=" + maxLon + "&lat_min=" + minLat + "&lat_max=" + maxLat + "&kinds=amusements&format=json&limit=10&apikey=" + openTripAPIkey;

    fetch(amusementsURL)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        displayAmusements(data);
        return data;
    });
};

// this function dynamcially creates elements on the page
var displayAmusements = function(data) {
    for (var i = 0; i < data.length; i++) {
        var amusementName = data[i].name;
        
        var amusementEl = $("<li>").addClass().text(amusementName);
        $("#amusementList").append(amusementEl);
    };
};

// when search button is clicked, destination field text is passed into getLatLon()
$("#search").click(function(event) {
    event.preventDefault();

    userInput = $("#destinationInput").val();
    getLatLon(userInput);
});
