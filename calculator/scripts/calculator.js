"use strict";


var buttons = document.getElementsByTagName("button"),
    display = document.getElementById("display"),
    clear = document.getElementById("bclear"),
    removeLast = document.getElementById("bremlast"),
    operators = ['+', '-', 'x', '÷'];


for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].value === "=") {
        buttons[i].addEventListener("click", calculate());
    } else if (operators.indexOf(buttons[i].value) > -1) {
        buttons[i].addEventListener("click", addOperator(i));
    } else if (buttons[i].value === ".") {
        buttons[i].addEventListener("click", addDecimal());
    } else if (buttons[i].value === "0") {
        buttons[i].addEventListener("click", addZero());
    } else {
        buttons[i].addEventListener("click", addValue(i));
    }
}


function addOperator(i) {
    return function() {
        var lastChar = display.value[(display.value).length - 1];
        switch (buttons[i].value) {
            case ("÷"):
                if (checkCondition()) {
                    display.value += "";
                } else {
                    display.value += "/";
                }
                break;
            case ("x"):
                if (checkCondition()) {
                    display.value += "";
                } else {
                    display.value += "*";
                }
                break;
            case ("+"):
                if (checkCondition()) {
                    display.value += "";
                } else {
                    display.value += "+";
                }
                break;
            case ("-"):
                if (checkCondition()) {
                    display.value += "";
                } else {
                    display.value += "-";
                }
                break;
        }
    };
}

function checkCondition() {
    var lastChar = display.value[(display.value).length - 1];
    if ((display.value).length == 0 ||
        lastChar == "/" ||
        lastChar == "*" ||
        lastChar == "+" ||
        lastChar == "-" || lastChar == ".") {
        return true;
    }
    return false;
}

function addDecimal() {
    return function() {
        var lastChar = display.value[(display.value).length - 1];
        if ((display.value).length == 0) {
            display.value += "0.";
        } else if (isNaN(lastChar)) {
            display.value += "";
        } else if ((lastChar - 1) == 0) {
            display.value += ".";
        } else {
            display.value += ".";
        }
    };
}

function addZero() {
    return function() {
        if ((display.value).length == 0) {
            display.value += "0";
        } else {
            display.value += "0";
        }
    };
}

function addValue(i) {
    return function() {
        switch (buttons[i].value) {
            case ("1"):
                display.value += "1";
                break;
            case ("2"):
                display.value += "2";
                break;
            case ("3"):
                display.value += "3";
                break;
            case ("4"):
                display.value += "4";
                break;
            case ("5"):
                display.value += "5";
                break;
            case ("6"):
                display.value += "6";
                break;
            case ("7"):
                display.value += "7";
                break;
            case ("8"):
                display.value += "8";
                break;
            case ("9"):
                display.value += "9";
                break;
        }
    };
}

function calculate() {
    return function() {
        var lastChar = display.value[(display.value).length - 1];
        if (operators.indexOf(lastChar) > -1 || lastChar == '.' || (display.value).length == 0) {
            display.value += "";
        } else if ((display.value).substring((display.value).length - 2) === "/0") {
            display.value = "";
        } else {
            display.value = eval(display.value);
        }
    };
}

clear.onclick = function() {
    display.value = "";
}

removeLast.onclick = function() {
    display.value = (display.value).slice(0, -1);
}
