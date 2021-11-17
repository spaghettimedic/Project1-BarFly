var barsEl = document.querySelector("#resultBars");
var amusementsEl = document.querySelector("#resultAmusements");

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

    for (var i = 0; i < intelAmusements.length; i++) {
        var amusementName = intelAmusements[i];

        var amusementEl = document.createElement("div");
        amusementEl.classList = "";

        var titleAmEl = document.createElement("span");
        titleAmEl.textContent = amusementName;

        amusementsEl.appendChild(titleFlEl);

        amusementsEl.appendChild(amusementEl);
    }
};