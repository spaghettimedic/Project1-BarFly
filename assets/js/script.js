var barsEl = document.querySelector("#resultBars");
var flightsEl = document.querySelector("#resultFlights");

var displayIntel = function() {
    for (var i = 0; i < intel.length; i++) {
        var barName = intel[i];

        var barEl = document.createElement("div");
        barEl.classList = "";

        var titleEl = document.createElement("span");
        titleEl.textContent = barName;

        barEl.appendChild(titleEl);

        barsEl.appendChild(barEl);
        
    }

    for (var i = 0; i < intelFlights.length; i++) {
        var flightName = intelFlights[i];

        var flightEl = document.createElement("div");
        flightEl.classList = "";

        var titleFlEl = document.createElement("span");
        titleFlEl.textContent = flightName;

        flightEl.appendChild(titleFlEl);

        flightsEl.appendChild(flightEl);
    }
};