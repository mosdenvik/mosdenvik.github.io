"use strict";

(function () {
    var startButton = document.getElementById('start');
    var body = document.querySelector('body');
    var div = document.createElement('div');
    div.setAttribute("id", "div-for-table");
    body.appendChild(div);



    function initGame() {

        if (table) {
            alert("Table Exist");
            div.removeChild(table);
            table = null;
        }

        var table = createFieldTable();
        div.appendChild(table);


    }

    function createFieldTable() {
        var table = document.createElement('table');
        for (var i = 0; i < 3; i++) {
            var row = table.insertRow(i);
            for (var j = 0; j < 3; j++) {
                var cell = row.insertCell(j);

            }
        }
        return table;
    }

    startButton.addEventListener('click', function(){
        //window.location.reload();
        initGame();
    });


})();