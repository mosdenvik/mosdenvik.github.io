"use strict";

(function() {
    var buttons = document.getElementsByTagName("button"),
        display = document.getElementById("display"),
        clear = document.getElementById("bclear");


    for (var i = 0; i < buttons.length; i++) {
    	if (buttons[i].value === "=") {
            buttons[i].addEventListener("click", calculate(i));
        } else {
            buttons[i].addEventListener("click", addValue(i));
        }
    }


    function addValue(i) {
        return function() {
            if (buttons[i].value === "÷") {
                display.value += "/";
            } else if (buttons[i].value === "x") {
                display.value += "*";
            } else {
                display.value += buttons[i].value
            }
        };
    }

    function calculate(i) {
        return function() {
            display.value = eval(display.value);
        };
    }

    clear.onclick = function() {
        display.value = "";
    };

})();
