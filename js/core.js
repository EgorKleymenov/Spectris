function start() {
    document.getElementById('onbut').style.display='none';
    document.getElementById('finaltxt').style.display='none';
    context.globalAlpha = 1;
    canvas.focus();

    for (var i = 0; i < 14; i++)
        for (var j = 0; j < 24; j++)
            fieldArr[i][j] = 0;

    score = 0;
    fNum = 1;
    fsize = 0;
    newC = -1;
    MaskX = 0;
    MaskY = 0;
    newF = -1;
    countt = 0;

    drawBorder();
    drawField();
    startGame();
}

function startGame() {
    spawn();
    update();

    setTimeout( function() {
        if (Fmove(3, MaskX, MaskY, fNum-1)) { // moveDown
            update();
            setTimeout(arguments.callee, timeout);
        } else {
            freeze(MaskX, MaskY, fNum-1);

            if (spawn()) {
                update();
                setTimeout(arguments.callee, timeout);
            } else {
                update();
                gameover();
                return;
            }
        }
    }, timeout);
}

function gameover() {
    context.globalAlpha = 0.3;
    document.getElementById('onbut').style.display='inline';
    document.getElementById('finaltxt').style.display='inline';
    update();

    context.font = "55px Comic Sans MS bold";
    context.strokeStyle = "#330000";
    context.textAlign = "center";
    context.globalAlpha = 1;
    context.strokeText("Your score: " + score, canvas.width/2, canvas.height/3);
}

function keyReleased(e) {
    release[e.which-37] = true;
}

function keyPressed(e) {
    var code = e.which - 37;

    if (code < 0 && code > 3) return 0;
    if (!release[code]) return 0;

    release[code] = false;

    if (code == 1) {
        Frotate(MaskX, MaskY, fNum - 1);
        update();

        setTimeout (function() {
            if (release[code] == 0) {
                Frotate(MaskX, MaskY, fNum - 1);
                update();

                setTimeout(arguments.callee, keyNextTimeout);
            }
        }, keyFirstTimeout);
    } else if (code > -1 && code < 4) {
        Fmove(code, MaskX, MaskY, fNum-1);
        update();

        setTimeout (function() {
            if (release[code] == 0) {
                Fmove(code, MaskX, MaskY, fNum-1);
                update();

                if(code == 3) // moveDown
                    setTimeout(arguments.callee, keyFirstTimeout);
                else
                    setTimeout(arguments.callee, keyNextTimeout);
            }
        }, keyFirstTimeout);
    }
}

function Frotate(X, Y, N) {
    var MaskCopy = clone(Mask);

    // try rotate
    for (var i = 0; i < fsize; i++)
        for (var j = 0; j < fsize; j++)
            Mask[i][j] = MaskCopy[j][fsize-i-1];

    if ( !figureIntersectsWithField(X, Y, N) ) {
        return 1;
    } else {
        Mask = clone(MaskCopy);
        return 0;
    }
}

function Fmove(code, X, Y, N) {
    var dx = Math.round(-Math.cos(2*Math.PI*code/4)),
        dy = Math.round(-Math.sin(2*Math.PI*code/4));

    if ( !figureIntersectsWithField(X+dx, Y+dy, N) ) {
        MaskX += dx;
        MaskY += dy;
        return 1;
    }

    return 0;
}

function figureIntersectsWithField(X, Y, N) {
    var left = Math.max(0, X);
    var right = Math.min(cellsX-1, X+fsize-1);
    var top = Math.max(0, Y);
    var bottom = Math.min(cellsY-1, Y+fsize-1);

    // inside intersection with field
    for (var i = left; i <= right; i++)
        for (var j = top; j <= bottom; j++)
            if (Mask[i-X][j-Y] > 0 && fieldArr[i][j] > 0)
                return 1;

    // vertical borders
    if ((right+1)-X < fsize && right+1 > cellsX-1) { // right
        for (var j = top; j <= bottom; j++)
            if (Mask[right+1-X][j-Y] > 0)
                return 1;
    }
    if ((left-1)-X > -1 && left-1 < 0) { // left
        for (var j = top; j <= bottom; j++)
            if (Mask[left-1-X][j-Y] > 0)
                return 1;
    }

    // horizontal borders
    if ((bottom+1)-Y < fsize && bottom+1 > cellsY-1) { // bottom
        for (var i = left; i <= right; i++)
            if (Mask[i-X][bottom+1-Y] > 0)
                return 1;
    }
    if ((top-1)-Y > -1 && top-1 < 0) { // top
        for (var i = left; i <= right; i++)
            if (Mask[i-X][top-1-Y] > 0)
                return 1;
    }

    return 0;
}

function spawn() {
    // 1 of 25 figures is generated randomly
    newF = Math.floor(Math.random() * 26);
    fsize = figures[newF][0].length;

    // clear mask
    if (Mask instanceof Array) {
        for (var i = 0; i < Mask.length; i++)
            Mask[i] = [];
        Mask = [];
    }

    // initialize new mask of figure (depends on figure size)
    Mask = new Array(fsize);
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

    // check intersections
    if (figureIntersectsWithField(MaskX, MaskY,  fNum))
        return 0;

    fNum++;
    return 1;
}

function freeze(X, Y, N) {
    var left = Math.max(0, X);
    var right = Math.min(cellsX, X+fsize);
    var top = Math.max(0, Y);
    var bottom = Math.min(cellsY, Y+fsize);

    for (var i = left; i < right; i++)
        for (var j = top; j <bottom; j++)
            fieldArr[i][j] += Mask[i-X][j-Y] * (10*N + newC);
}
