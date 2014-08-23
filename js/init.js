var canvas = document.getElementById('field');
var context = canvas.getContext('2d');
var release = [1, 1, 1, 1];

var cellsX = 14;
var cellsY = 24;
var score = 0;
var gameW = Math.round(350*((document.body.offsetWidth-15)/1351));
var gameH = Math.round(600*((document.body.offsetHeight-20)/657));
var cellX = Math.round((gameW/14+gameH/24)/2);

var timeout = 200,
    keyFirstTimeout = 150,
    keyNextTimeout = 50;

var fieldArr = new Array(14);     // rows
for (var i = 0; i < 14; i++) {
    fieldArr[i] = new Array(24);    // colls
    for (var j = 0; j < 24; j++) {
        fieldArr[i][j] = 0;
    }
}

var countt;
var fNum = 1;
var fsize;
var newC;
var MaskX = 0;
var MaskY = 0;
var colors = ["#CC0000", "#FF6600", "#FFCC33", "#006600", "#00AAFF", "#330099", "#660066", "#FF6699", "#33FF33"];

var Mask;
var newF = -1;                         // номер текущей фигурки в массиве ниже
var figures = new Array(26);
// trimino
figures[0] = [[1, 0],
    [1, 1]];
figures[1] = [[0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]];
// tetramino
figures[2] = [[0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]];
figures[3] = [[0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]];
figures[4] = [[1, 1],
    [1, 1]];
figures[5] = [[0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]];
figures[6] = [[1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]];
figures[7] = [[1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]];
figures[8] = [[0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]];
// pentamino
figures[9] = [[0, 1, 1],
    [1, 1, 0],
    [0, 1, 0]];
figures[10] = [[1, 1, 0],
    [0, 1, 1],
    [0, 1, 0]];
figures[11] = [[0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]];
figures[12] = [[0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0]];
figures[13] = [[0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]];
figures[14] = [[0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0]];
figures[15] = [[0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]];
figures[16] = [[0, 1, 1],
    [1, 1, 0],
    [1, 0, 0]];
figures[17] = [[0, 1, 1],
    [1, 1, 1],
    [0, 0, 0]];
figures[18] = [[1, 1, 0],
    [1, 1, 1],
    [0, 0, 0]];
figures[19] = [[1, 1, 1],
    [1, 0, 1],
    [0, 0, 0]];
figures[20] = [[0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]];
figures[21] = [[0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0]];
figures[22] = [[0, 0, 1],
    [1, 1, 1],
    [0, 0, 1]];
figures[23] = [[0, 0, 1],
    [1, 1, 1],
    [1, 0, 0]];
figures[24] = [[1, 0, 0],
    [1, 1, 1],
    [0, 0, 1]];
figures[25] = [[1, 1, 1],
    [1, 0, 0],
    [1, 0, 0]];


canvas.width = document.body.offsetWidth-15;
canvas.height = document.body.offsetHeight-20;

document.getElementById('onbut').style.width=cellX*cellsX/2+"px";         // ширина и высота кнопки СТАРТ
document.getElementById('onbut').style.height=cellX*cellsX/4+"px";
document.getElementById('onbut').style.top=canvas.height/2+"px";
document.getElementById('onbut').style.left=(canvas.width-gameW)/2 + 10 + 7*cellX/2 + "px";

document.getElementById('finaltxt').style.top=canvas.height/6+"px";
document.getElementById('finaltxt').style.left=(canvas.width-gameW)/2 + cellX + 2 + "px";
document.getElementById('finaltxt').style.fontSize=2*cellX+"px";
document.getElementById('finaltxt').style.display='none';

drawField();
drawBorder();
