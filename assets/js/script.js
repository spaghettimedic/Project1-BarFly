// import { Duffel } from "@duffelapi"
// const duffel = new Duffel({
//     token: duffel_test_TCwYLMchbuQPq6TtqLyK_wVVnmKGdgaUW3z-I1XfDPp,
// });

var flightList = document.querySelector(".flightList"); // insert class name for flight <ul> here

// getFlightAPI() is called when searchButton is clicked

function getFlightAPI() {
    // var city = $("#cityInput").val();
    // var requestFlightURL = "https://api.duffel.com/air/offer_requests?per_page=10"; // insert api url here, edited to only show 10 results

    // fetch(requestFlightURL)
    // .then(function(flightResponse) {
    //     console.log(flightResponse.json());
    //     return flightResponse.json();
    // })
    // .then(function(data) {
    //     if (data === null) {
    //         alert("There are no flights available between the cities selected on the dates selected. Please try again or check back later!");
    //     }
    var data = [1, 2, 3, 4, 5];
    var test = function() {
        for (var i = 0; i < data.length; i++) {
            var airline = "American Airlines"; // data[i].offers.slices.segments.operating_carrier.name;
            var departTime = "12:00"; // data[i].offers.slices.segments.departing_at;
            var cost = "$500"; // data[i].offers.total_amount;
            var flightListItem = document.createElement("li");

            flightListItem.textContent = "Airline: " + airline + "      " + "Depart time: " + departTime + "        " + "Price: " + cost;
            flightList.appendChild(flightListItem);
        }
    }
    test();
//     })
};

$("#search").click(function(event) {
    event.preventDefault();
    getFlightAPI();
});
