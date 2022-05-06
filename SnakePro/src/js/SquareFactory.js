// 工厂模式 
function SquareFactory() {

};

SquareFactory.create = function (type, x, y, color) {
    if (typeof SquareFactory.prototype[type] == 'undefined') {
        throw 'no this type';
    }

    if (SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }

    var newSquare = new SquareFactory.prototype[type](x, y, color);
    return newSquare;
};

SquareFactory.prototype.init = function (square, color) {
    square.viewContent.style.position = "absolute";
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.backgroundColor = color;
    square.viewContent.style.left = square.x * SQUAREWIDTH + 'px';
    square.viewContent.style.top = square.y * SQUAREWIDTH + 'px';
    document.body.appendChild(square.viewContent);

    this.SquareTable = [];
    for (var y = 0; y < YLEN; y++) {
        this.SquareTable[y] = new Array(this.XLEN);
        for (var x = 0; x < XLEN; x++) {
        }
    }
    console.log(this.SquareTable)
};

SquareFactory.prototype.Floor = function (x, y, color) {
    var oFloor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oFloor, color)
    return oFloor;
};

SquareFactory.prototype.Stone = function (x, y, color) {
    var oFloor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oFloor, color)
    return oFloor;
};

// SquareFactory.create('Floor', x, y, 'orange');
// SquareFactory.create('Stone', x, y, 'blank');