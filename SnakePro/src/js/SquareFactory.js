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

SquareFactory.prototype.init = function (square, color, ms) {
    square.viewContent.style.position = "absolute";
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.backgroundColor = color;
    square.viewContent.style.left = square.x * SQUAREWIDTH + 'px';
    square.viewContent.style.top = square.y * SQUAREWIDTH + 'px';
    square.touch = function () {
        return ms;
    }
};

// 可移动的区域
SquareFactory.prototype.Floor = function (x, y, color) {
    var oFloor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oFloor, color, STRATEGYMESSAGEENUM.MOVE)
    return oFloor;
};

// 墙壁
SquareFactory.prototype.Stone = function (x, y, color) {
    var oStone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oStone, color, STRATEGYMESSAGEENUM.DIE)
    return oStone;
};

// 食物 
SquareFactory.prototype.Food = function (x, y, color) {
    var oFood = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oFood, color, STRATEGYMESSAGEENUM.EAT);
    oFood.upDate(x, y);
    return oFood;
};

// 蛇的头
SquareFactory.prototype.SnakeHead = function (x, y, color) {
    var oSnakeHead = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oSnakeHead, color, STRATEGYMESSAGEENUM.DIE)
    oSnakeHead.upDate(x, y);
    return oSnakeHead;
};

// 蛇的身体
SquareFactory.prototype.SnakeBody = function (x, y, color) {
    var oSnakeBody = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oSnakeBody, color, STRATEGYMESSAGEENUM.DIE)
    return oSnakeBody;
};

// SquareFactory.create('Floor', x, y, 'orange');
// SquareFactory.create('Stone', x, y, 'blank');