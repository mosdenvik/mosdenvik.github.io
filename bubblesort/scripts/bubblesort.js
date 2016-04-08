"use strict";
(function() {
    var enterButton = document.getElementById("enter-button");
    var reset = document.getElementById("reset");
    var stepForward = document.getElementById("forward");

    var numsString = document.getElementById("nums");
    var numsValue = numsString.value;
    var numsArray = numsValue.split(/\s*,\s*/);

    function createNumsRow(array){
        var divCell = document.getElementById("div-cell");
        var numCells = document.createElement("table");
        numCells.setAttribute("id", "num-cell");
        numCells.insertRow(0);

        for (var i = 0; i < array.length; i++) {
            if (!isNaN(parseFloat(array[i])) && isFinite(array[i])) {
                var cell = numCells.rows[0].insertCell(i);
                cell.innerHTML = array[i];
            } else {
                alert("Wrong number. Enter correct numbers!");
            }
        }
        divCell.appendChild(numCells);
        enterButton.disabled = true;
    }

    function makeSort(array){
        for (i = 0; i < array.length; i++){
            if (array[i] > array[i+1]){
                var temp = array[i+1];
                array[i+1] = array[i];
                array[i] = temp;
                i = i-2;
            }
        }
    }

    enterButton.onclick = function(){
        createNumsRow(numsArray);
    }

    reset.onclick = function(){
        window.location.reload();
    }

    stepForward.onclick = function(){
        makeSort(numsArray);
    }

})();













