var canvas = document.getElementById('field');
var context = canvas.getContext('2d');
var release;
var timeoutID = 0;
var test02 = 0;

var cellsX = 14;
var cellsY = 24;
var score = 0;
var gameW = Math.round(350*((document.body.offsetWidth-15)/1351));
var gameH = Math.round(600*((document.body.offsetHeight-20)/657));
var cellX = Math.round((gameW/14+gameH/24)/2);

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

//******************************************************************************************************************************************
//******************************************************************************************************************************************
//******************************************************************************************************************************************
function start() {
  document.getElementById('onbut').style.display='none';
  document.getElementById('finaltxt').style.display='none';
  context.globalAlpha = 1;
  for (var i = 0; i < 14; i++) {
    for (var j = 0; j < 24; j++) {
      fieldArr[i][j] = 0;
    }
  }
  score = 0;
  test02 = 0;
  fNum = 1;
  fsize = 0;
  newC = -1;
  MaskX = 0;
  MaskY = 0;
  newF = -1;
  countt = 0;

  drawBorder();
  drawField();
  drawStuff();
}

function gameover() {
    context.clearRect (0, 0, canvas.width, canvas.height);

    context.globalAlpha = 0.3;
    document.getElementById('onbut').style.display='inline';
    document.getElementById('finaltxt').style.display='inline';
    drawBorder();
    drawField();
    drawFigures();
    test02 = 1;

    context.font = "55px Comic Sans MS bold";
    context.strokeStyle = "#330000";
    context.textAlign = "center";
    context.globalAlpha = 1;
    context.strokeText("Your score: " + score, canvas.width/2, canvas.height/3);
}

function keyReleased(e) {
  release = 1;
}
function keyPressed(e) {
    if (!release) return 0;
    release = 0;
    var code = e.which;
    if (code == 38) {
        setTimeout (function() {
            Frotate(MaskX, MaskY, fNum-1);
            context.clearRect (0, 0, canvas.width, canvas.height);
            drawField();
            drawFigures();
            drawBorder();
            if (release == 0) setTimeout(arguments.callee, 100);
        }, 100)
    }
    else if (code > 36 && code < 41) {
        Fmove(code-38, MaskX, MaskY, fNum-1);
        setTimeout (function() {
            context.clearRect (0, 0, canvas.width, canvas.height);
            drawField();
            drawFigures();
            drawBorder();
            if ( (release == 0) && Fmove(code-38, MaskX, MaskY, fNum-1)) setTimeout(arguments.callee, 100);
        }, 100)
    }
}

function Fmove(code, X, Y, N) {
    if (code == 2) {                        // user move down
        return moveD(X, Y, N);
    }
    else {                                  // user move left/right
        X += code;
        var test = 0;
        var left = Math.max(0, X);
        var right = Math.min(cellsX, X+fsize);
        var top = Math.max(0, Y);
        var bottom = Math.min(cellsY, Y+fsize);

        for (var i = left; i < right; i++) {
            for (var j = top; j < bottom; j++) {
                if (Mask[j-top][i-left]+fieldArr[i][j] == 1) {
                    if ( (i+1 == fieldArr.length) || (i == 0) || (fieldArr[i][j] && Mask[j-Y][i-X]) ) {    // reach the obstacle/border
                        return 0;
                    }
                }
            }
        }

      // can move
      MaskX += code;
      return 1;
    }
}

function Frotate(X, Y, N) {
    var MaskCopy = new Array(fsize);
    for (var k = 0; k < fsize; k++) {
        MaskCopy[k] = new Array(fsize);
        for (var l = 0; l < fsize; l++)
            MaskCopy[k][l] = Mask[k][l];
    }

    for (var i = X; i < X+fsize; i++) {
        for (var j = Y; j < Y+fsize; j++) {
            if ( (Mask[X+fsize -1 - i][j-Y] + fieldArr[i][j] != 0) && (Mask[X+fsize -1 - i][j-Y] + fieldArr[i][j] != 1) ) {
                //alert ("cant rotate figure " + Mask[X+fsize -1 - i][j-Y] + " " + fieldArr[i][j]);
                return 0;
            }
        }
    }

    // can rotate
    for (var i = X; i < X+fsize; i++) {
        for (var j = Y; j < Y+fsize; j++) {
            //alert (Mask[j-Y][i-X] + " " + Mask[X+fsize -1 - i][j-Y] + " " + fsize);
            Mask[j-Y][i-X] = MaskCopy[X+fsize -1 - i][j-Y];
        }
    }
    return l;
}

function drawStuff() {
  spawn();
  drawFigures();

  if (!moveD(MaskX, MaskY, fNum-1)) gameover();

  timeoutID = setTimeout( function() {
    context.clearRect (0, 0, canvas.width, canvas.height);
    drawField();
    drawFigures();
    drawBorder();

    if (moveD(MaskX, MaskY, fNum-1))
      setTimeout(arguments.callee, 200);
    else {
      freeze(MaskX, MaskY, fNum-1);

      if (!spawn()) {
          gameover();
          clearTimeout(timeoutID);
      }

      drawFigures();
      if (!moveD(MaskX, MaskY, fNum-1)) {
          gameover();
          clearTimeout(timeoutID);
      }
      if (!test02) {
          setTimeout(arguments.callee, 200);
      }
    }
  }, 200);
}

function moveD(X, Y, N) {
    var left = Math.max(0, X);
    var right = Math.min(cellsX, X+fsize);
    var top = Math.max(0, Y);
    var bottom = Math.min(cellsY, Y+fsize);

    for (var i = left; i < right; i++) {
        for (var j = top; j <bottom; j++) {
            if (Mask[j-top][i-left]+fieldArr[i][j] == 1) {
                if ( (j+1 == fieldArr[i].length) || (fieldArr[i][j+1] && Mask[j-top][i-left]) ) {         // reach the bottom
                    return 0;
                }
            }
        }
    }
    // can move down
    MaskY++;
    return 1;
}

function freeze(X, Y, N) {
    var left = Math.max(0, X);
    var right = Math.min(cellsX, X+fsize);
    var top = Math.max(0, Y);
    var bottom = Math.min(cellsY, Y+fsize);

    for (var i = left; i < right; i++) {
        for (var j = top; j <bottom; j++) {
            fieldArr[i][j] += Mask[j-top][i-left] * (10*N + newC);
        }
    }
}


function spawn() {
    newF = Math.floor(Math.random() * 26);            // 1 of 25 figures is generated randomly
    fsize = figures[newF][0].length;
    Mask = new Array(fsize);                      // initialize new mask of figure (depends on figure size)
    for (var i = 0; i < fsize; i++) {
        Mask[i] = new Array(fsize);
        for (var j = 0; j < fsize; j++) {
            Mask[i][j] = figures[newF][i][j];
        }
    }

    newC = Math.floor((Math.floor(Math.random()*37))/4);        // generate
    //alert (newF + '\n' + fsize + '\n' + newC + '\n' + colors[newC]);
    fsize == 2 ? MaskX = 6 : MaskX = 5;
    MaskY = 0;
    for (var i = 0; i < fsize; i++) {
        for (var j = 0; j < fsize; j++) {
            if (Mask[j][i] && fieldArr[MaskX+i][MaskY+j]) return 0;
        }
    }
    fNum++;
    return 1;
}

function drawField() {
  context.lineWidth = 0.5;
  context.strokeStyle = "darkgrey";

  for (var i = Math.floor((canvas.width-gameW)/2); i < Math.floor((canvas.width-gameW)/2) + cellX*cellsX; i += cellX) {
    for (var j = 5; j < (5+cellX*cellsY); j += cellX) {
      context.strokeRect(i, j, cellX, cellX);
    }
  }
}

function drawBorder() {
  context.strokeStyle="black";
  context.lineWidth = 1.5;
  context.strokeRect( (canvas.width-gameW)/2, 5, cellX*cellsX, cellX*cellsY);
}

function drawFigures() {
  for (var i = 0; i < cellsX; i++) {
    for (var j = 0; j < cellsY; j++) {
      if (fieldArr[i][j] !== 0) {
        drawCell(i, j, (fieldArr[i][j]%10));
      }
    }
  }

  for (var i = MaskX; i < MaskX + fsize; i++) {
      for (var j = MaskY; j < MaskY + fsize; j++) {
          if (Mask[j-MaskY][i-MaskX]*((fNum-1)*10 + newC)) {
              drawCell(i, j, newC);

          }
      }
  }
}

function drawCell(x, y, c) {
  context.strokeStyle = "lightgrey";
  context.lineWidth = 3.5;
  if (c != 9) {
      context.fillStyle = colors[c];
  }
  else {
      //var grd=context.createRadialGradient((x+0.5)*cellX+(canvas.width-gameW)/2,(0.5+y)*cellX + 5, cellX/14, (x+0.5)*cellX+(canvas.width-gameW)/2,(0.5+y)*cellX + 5, cellX/2);
      var grd=context.createLinearGradient(x*cellX +1 +(canvas.width-gameW)/2, y*cellX+6, (x+1)*cellX-1 +(canvas.width-gameW)/2, (y+1)*cellX+4);
      grd.addColorStop(0, colors[0]);
      for (var k = 0; k < 7; k++) {
          grd.addColorStop(k*(1/6),colors[k]);
      }
      context.fillStyle = grd;
  }
  drawRect(context, x*cellX +1 +(canvas.width-gameW)/2, y*cellX + 5 + 1, cellX-2, cellX-2);
}

function drawRect(ctx, x, y, width, height) {
  ctx.strokeRect(x, y, width, height);
  ctx.fillRect(x, y, width, height);
}

function sleep(millis, callback) {
    setTimeout(function() { callback(); } , millis);
}


/* Comment block
******************************************************************************************************************
var winW = 630, winH = 460;
if (document.body && document.body.offsetWidth) {
 winW = document.body.offsetWidth;
 winH = document.body.offsetHeight;
}
if (document.compatMode=='CSS1Compat' &&
    document.documentElement &&
    document.documentElement.offsetWidth ) {
 winW = document.documentElement.offsetWidth;
 winH = document.documentElement.offsetHeight;
}
if (window.innerWidth && window.innerHeight) {
 winW = window.innerWidth;
 winH = window.innerHeight;
}
************************************************************************************************************
// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
}

resizeCanvas();

******************************************************************************************************************
/*function mute() {
  var sound = document.getElementById("snd");
  var picture = document.getElementById("pic");

  if (sound.muted == true) {
    picture.src = "http://cs618030.vk.me/v618030452/8e53/zDzufchYWYY.jpg";
    sound.muted = false;
  }
  else {
    picture.src = "http://cs618030.vk.me/v618030452/8e4c/g3YFGu-NVM8.jpg";
    sound.muted = true;
  }
}*/


