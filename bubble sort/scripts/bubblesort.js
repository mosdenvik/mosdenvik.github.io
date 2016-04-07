"use strict";
(function() {
    var enterButton = document.getElementById("enter-button");

    function createNumsRow() {
        var numsString = document.getElementById("nums");
        var numsValue = numsString.value;
        var numsArray = numsValue.split(/\s*,\s*/);
        var divCell = document.getElementById("div-cell");

        var numCells = document.createElement("table");
        numCells.setAttribute("id", "num-cell");
        numCells.insertRow(0);

        for (var i = 0; i < numsArray.length; i++) {
            if (!isNaN(parseFloat(numsArray[i])) && isFinite(numsArray[i])) {
                var cell = numCells.rows[0].insertCell(i);
                cell.innerHTML = numsArray[i];
            } else {
                alert("Wrong number. Enter correct numbers!");
            }
        }
        divCell.appendChild(numCells);
    }
    enterButton.addEventListener("click", createNumsRow, true);
    enterButton.removeEventListener("click", createNumsRow);


})();













