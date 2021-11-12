var flightList = document.querySelector(".flightList"); // insert class name for flight <ul> here
var searchButton = document.querySelector("#search"); // insert id/class for search <button> here

// getFlightAPI() is called when searchButton is clicked

function getFlightAPI() {
    var requestFlightURL = "https://api.duffel.com/air/offer_requests?per_page=10"; // insert api url here, edited to only show 10 results

    fetch(requestFlightURL)
    .then(function(flightResponse) {
        console.log(flightResponse.json());
        return flightResponse.json();
    })
    .then(function(data) {
        for (var i = 0; i < data.length; i++) {
            var flightListItem = document.createElement("li");

            flightListItem.textContent = data[i].total_amount // find out what property of the response needs to be entered here -- NEED TO GET: 1) airline name, 2) flight time, 3) price
            flightList.appendChild(flightListItem);
        }
    })
}

searchButton.addEventListener("click", getFlightAPI);
