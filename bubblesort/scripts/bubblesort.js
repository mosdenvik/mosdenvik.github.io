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
        console.log(cellsForSort);
        var temp;
        var next = true;
        for (var i = cellsForSort.length - 1; i > 0; i--){
            for (var j = 0; j < i; j++) {
                if ((parseInt(cellsForSort[j].innerHTML) > parseInt(cellsForSort[j + 1].innerHTML)) && next === true) {
                    for (var k = 0; k < cellsForSort.length; k++) {
                        cellsForSort[k].style.background = "whitesmoke";
                    }
                    cellsForSort[j].style.background = "red";
                    cellsForSort[j + 1].style.background = "red";
                    temp = cellsForSort[j].innerHTML;
                    cellsForSort[j].innerHTML = cellsForSort[j + 1].innerHTML;
                    cellsForSort[j + 1].innerHTML = temp;
                    next = false;
                }
            }
        }

        //for (var i = cellsForSort.length - 1; i > 0; i--){
        //    //next:
        //    for (var j = 0; j < i; j++) {
        //        cellsForSort[j].style.background = "yellow";
        //        cellsForSort[j+1].style.background = "yellow";
        //        //continue next;
        //        if (parseInt(cellsForSort[j].innerHTML) > parseInt(cellsForSort[j+1])){
        //            cellsForSort[j].style.background = "red";
        //            cellsForSort[j+1].style.background = "red";
        //
        //            temp = cellsForSort[j+1];
        //            cellsForSort[j+1] = cellsForSort[j];
        //            cellsForSort[j] = temp;
        //            j = j-2;
        //            next = false;
        //        }
        //    }
        //}
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













