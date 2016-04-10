"use strict";
(function() {
    var enterButton = document.getElementById("enter-button");
    var resetButton = document.getElementById("reset");
    var stepForwardButton = document.getElementById("forward");

    function createNumsRow(){
        var numsString = document.getElementById("nums");
        var numsValue = numsString.value;
        var numsArray = numsValue.split(/\s*,\s*/);

        var divCell = document.getElementById("div-cell");
        var numCells = document.createElement("table");
        numCells.setAttribute("id", "numcell");
        numCells.setAttribute("class", "numcell");
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
        enterButton.disabled = true;
    }


    function makeSort(){
        var rowCellArray = document.getElementById("numcell");
        var cellsForSort = rowCellArray.getElementsByTagName("td");
        var next = true;
        var length = cellsForSort.length;

        for (var i = 0; i < length; i++) {
            for (var j = 0; j < (length - i - 1); j++) {
                if((parseInt(cellsForSort[j].innerHTML) > parseInt(cellsForSort[j + 1].innerHTML)) && next === true) {
                    for (var k = 0; k < cellsForSort.length; k++) {
                        cellsForSort[k].style.background = "white";
                    }
                    cellsForSort[j].style.background = "red";
                    cellsForSort[j+1].style.background = "red";
                    var tmp = cellsForSort[j].innerHTML;
                    cellsForSort[j].innerHTML = cellsForSort[j+1].innerHTML;
                    cellsForSort[j+1].innerHTML = tmp;
                    next = false;
                }
            }
        }
    }


    enterButton.onclick = function(){
        createNumsRow();
    }

    resetButton.onclick = function(){
        window.location.reload();
    }

    stepForwardButton.onclick = function(){
        makeSort();
    }

})();













