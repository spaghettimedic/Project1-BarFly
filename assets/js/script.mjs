import { Duffel } from '@duffel/api';

const duffel = new Duffel({
    token: duffel_test_TCwYLMchbuQPq6TtqLyK_wVVnmKGdgaUW3z-I1XfDPp,
});

var flightList = document.querySelector(".flightList");

function getFlightResponse() {
    var requestFlightURL = "https://api.duffel.com/air/offer_requests";

    $.ajax({
        url: requestFlightURL,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer duffel_test_TCwYLMchbuQPq6TtqLyK_wVVnmKGdgaUW3z-I1XfDPp");
            xhr.setRequestHeader("Duffel-Version", "beta");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept-Encoding", "gzip");
        },
        success: (function(flightResponse) {
                console.log(flightResponse);
                getFlightData(flightResponse.json());
                return flightResponse.json();
        })
    });

    // fetch(requestFlightURL)
    // .then(function(flightResponse) {
    //     console.log(flightResponse.json());
    //     return flightResponse.json();
    // })
    // .then(function(data) {

    //     for (var i = 0; i < data.length; i++) {

    //         var airline = data[i].offers.slices.segments.operating_carrier.name;
    //         var departTime = data[i].offers.slices.segments.departing_at;
    //         var cost = data[i].offers.total_amount;
    //         var flightListItem = document.createElement("li");

    //         flightListItem.textContent = "Airline: " + airline + "      " + "Depart time: " + departTime + "        " + "Price: " + cost;
    //         flightList.appendChild(flightListItem);
    //     }
    // });
};

function getFlightData () {

    for (var i = 0; i < data.length; i++) {

        var airline = data[i].offers.slices.segments.operating_carrier.name;
        var departTime = data[i].offers.slices.segments.departing_at;
        var cost = data[i].offers.total_amount;
        var flightListItem = document.createElement("li");

        flightListItem.textContent = "Airline: " + airline + "      " + "Depart time: " + departTime + "        " + "Price: " + cost;
        flightList.appendChild(flightListItem);
    }

};

$("#search").click(function(event) {
    event.preventDefault();

    // get all user inputs and pass them into API call function
    var origin = $("#originInput").val();
    var destination = $("#destinationInput").val();
    var originDate = $("#originDate").val();
    var destinationDate = $("#destinationDate").val();
    getFlightResponse(origin, destination, originDate, destinationDate);
});