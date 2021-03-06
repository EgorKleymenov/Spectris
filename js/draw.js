function update() {
    context.clearRect (0, 0, canvas.width, canvas.height);
    drawField();
    drawFigures();
    drawBorder();
}

function drawField() {
    context.lineWidth = 0.5;
    context.strokeStyle = "darkgrey";

    for (var i = Math.floor((canvas.width-gameW)/2); i < Math.floor((canvas.width-gameW)/2) + cellX*cellsX; i += cellX)
        for (var j = 5; j < (5+cellX*cellsY); j += cellX)
            context.strokeRect(i, j, cellX, cellX);
}

function drawBorder() {
    context.strokeStyle="black";
    context.lineWidth = 1.5;
    context.strokeRect( (canvas.width-gameW)/2, 5, cellX*cellsX, cellX*cellsY);
}

function drawFigures() {
    for (var i = 0; i < cellsX; i++)
        for (var j = 0; j < cellsY; j++)
            if (fieldArr[i][j] > 0)
                drawCell(i, j, (fieldArr[i][j]%10));

    for (var i = MaskX; i < MaskX + fsize; i++)
        for (var j = MaskY; j < MaskY + fsize; j++)
            if (Mask[i-MaskX][j-MaskY] > 0)
                drawCell(i, j, newC);
}

function drawCell(x, y, c) {
    context.strokeStyle = "lightgrey";
    context.lineWidth = 3.5;

    if (c != 9) {
        context.fillStyle = colors[c];
    } else {
        //var grd=context.createRadialGradient((x+0.5)*cellX+(canvas.width-gameW)/2,(0.5+y)*cellX + 5, cellX/14, (x+0.5)*cellX+(canvas.width-gameW)/2,(0.5+y)*cellX + 5, cellX/2);
        var grd=context.createLinearGradient(x*cellX +1 +(canvas.width-gameW)/2, y*cellX+6, (x+1)*cellX-1 +(canvas.width-gameW)/2, (y+1)*cellX+4);

        grd.addColorStop(0, colors[0]);
        for (var k = 0; k < 7; k++)
            grd.addColorStop(k*(1/6),colors[k]);

        context.fillStyle = grd;
    }

    drawRect(context, x*cellX +1 +(canvas.width-gameW)/2, y*cellX + 5 + 1, cellX-2, cellX-2);
}

function drawRect(ctx, x, y, width, height) {
    ctx.strokeRect(x, y, width, height);
    ctx.fillRect(x, y, width, height);
}

function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
