"use strict";

var gameCreator = {

    init: function(w, h, b) {
        this.width = w;
        this.height = h;
        this.bombs = b;
        this.placedBombs = this.bombs;
        this.generateInterface();
    },

    generateInterface: function() {
        if (!this.game) {
            this.game = this.getGameField();

            this.gameTable = document.createElement("table");
            this.gameTable.className = "game-table";
            this.gameTable.insertRow(0);
            this.gameTable.insertRow(1);

            this.bombsLeft = this.gameTable.rows[0].insertCell(0);
            this.gameField = this.gameTable.rows[1].insertCell(0);

            this.game.appendChild(this.gameTable);
        }

        if (this.board) {
            this.board.parentNode.removeChild(this.board);
            this.board = null;
        }

        this.board = this.generateField();
        this.board.className = "game-board";

        this.gameField.appendChild(this.board);
    },

    getGameField: function() {
        return document.getElementById("game-area");
    },

    generateField: function() {
        var self = this;
        var table = document.createElement("table");
        this.bombsLeft.innerHTML = "Bombs left: " + this.placedBombs;

        for (var i = 0; i < this.height; i++) {
            var row = table.insertRow(i);
            for (var j = 0; j < this.width; j++) {
                var cell = row.insertCell(j);
                cell.num = 0;
                cell.index = [i, j];

                cell.leftClick = function() {
                    self.showInfo(this);
                };
                cell.rightClick = function() {
                    self.markBomb(this);
                };

                cell.addEventListener("click", cell.leftClick);
                cell.addEventListener("contextmenu", cell.rightClick, false);
            }
        }


        do {
            var hNum = this.rand(0, this.height - 1);
            var wNum = this.rand(0, this.width - 1);

            if (!table.rows[hNum].cells[wNum].bomb) {
                table.rows[hNum].cells[wNum].num = null;
                table.rows[hNum].cells[wNum].bomb = true;
                this.placedBombs--;
            }
        } while (this.placedBombs > 0);

        for (var i = 0, len = table.rows.length; i < len; i++) {
            for (var j = 0, len2 = table.rows[i].cells.length; j < len2; j++) {
                if (table.rows[i].cells[j].bomb) {
                    this.placeNumbers(table, j, i);
                }
            }
        }
        return table;
    },


    placeNumbers: function(t, x, y) {
        if (x > 0) {
            t.rows[y].cells[x - 1].num++;
        }

        if (x < this.width - 1) {
            t.rows[y].cells[x + 1].num++;
        }

        if (x > 0 && y > 0) {
            t.rows[y - 1].cells[x - 1].num++;
        }

        if (y > 0) {
            t.rows[y - 1].cells[x].num++;
        }

        if (y > 0 && x < this.width - 1) {
            t.rows[y - 1].cells[x + 1].num++;
        }

        if (x > 0 && y < this.height - 1) {
            t.rows[y + 1].cells[x - 1].num++;
        }

        if (y < this.height - 1) {
            t.rows[y + 1].cells[x].num++;
        }

        if (x < this.width - 1 && y < this.height - 1) {
            t.rows[y + 1].cells[x + 1].num++;
        }
    },

    showInfo: function(elem) {
        if (!elem.bomb) {
            if (elem.num > 0) {
                this.openCell(elem);
            } else {
                this.roll(elem.index[1], elem.index[0]);
            }
        } else {
            this.openCell(elem);
            this.gameOver();
        }
    },

    markBomb: function(elem) {
        var marked = false;
        if (!elem.marked) {
            elem.innerHTML = "<b>&#9873</b>"; // flag unicode
            this.bombsLeft.innerHTML = "Bombs left: " + --this.bombs;
            elem.marked = true;
            elem.removeEventListener("click", elem.leftClick);

        } else if (elem.marked) {
            elem.innerHTML = "<b>" + " " + "</b>";
            this.bombsLeft.innerHTML = "Bombs left: " + ++this.bombs;
            elem.marked = false;
            elem.addEventListener("click", elem.leftClick);
        }
    },

    openCell: function(elem) {
        if (!elem.bomb) {
            if (elem.num > 0) {
                elem.innerHTML = '<b>' + elem.num + '</b>';
                elem.removeEventListener("contextmenu", elem.rightClick);
            } else {
                elem.innerHTML = ' ';
            }

            switch (elem.num) {
                case 1:
                    elem.style.color = 'blue';
                    break;
                case 2:
                    elem.style.color = 'green';
                    break;
                case 3:
                    elem.style.color = 'red';
                    break;
                case 4:
                    elem.style.color = 'dakrblue';
                    break;
                case 5:
                    elem.style.color = 'pink';
                    break;
                case 6:
                    elem.style.color = 'navy';
                    break;
                case 7:
                    elem.style.color = 'brown';
                    break;
                case 8:
                    elem.style.color = 'grey';
                    break;
                default:
                    elem.style.color = 'black';
            }
        } else {
            elem.innerHTML = '<b>&#128163</b>'; // bomb unicode
        }
        elem.style.background = '#d8e0ec';
    },

    gameOver: function() {
        for (var i = 0, len1 = this.board.rows.length; i < len1; i++) {
            for (var j = 0, len2 = this.board.rows[i].cells.length; j < len2; j++) {
                if (this.board.rows[i].cells[j].bomb) {
                    this.openCell(this.board.rows[i].cells[j]);
                }
                this.board.rows[i].cells[j].removeEventListener("contextmenu", this.board.rows[i].cells[j].rightClick);
                this.board.rows[i].cells[j].removeEventListener("click", this.board.rows[i].cells[j].leftClick);
            }
        }
        alert("Game over!!!");
    },

    roll: function(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return;
        }

        this.openCell(this.board.rows[y].cells[x]);
        this.board.rows[y].cells[x].removeEventListener("contextmenu", this.board.rows[y].cells[x].rightClick);

        if (this.board.rows[y].cells[x].num > 0) {
            this.board.rows[y].cells[x].innerHTML = '<b>' + this.board.rows[y].cells[x].num + '</b>';
            return;
        }

        if (this.board.rows[y].cells[x].check) {
            return;
        }

        this.board.rows[y].cells[x].check = true;

        this.roll(x + 1, y);
        this.roll(x - 1, y);
        this.roll(x, y + 1);
        this.roll(x, y - 1);
        this.roll(x - 1, y - 1);
        this.roll(x + 1, y - 1);
        this.roll(x - 1, y + 1);
        this.roll(x + 1, y + 1);
    },

    rand: function(min, max) {
        min = parseInt(min);
        max = parseInt(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};




document.getElementById("start-button").onclick = function() {

    var levelBeginner = document.getElementById("beginner");
    var levelMiddle = document.getElementById("middle");
    var levelProf = document.getElementById("professional");

    if (levelBeginner.checked) {
        gameCreator.init(9, 9, 10);
    } else if (levelMiddle.checked) {
        gameCreator.init(16, 16, 40);
    } else if (levelProf.checked) {
        gameCreator.init(30, 16, 99);
    }
}
