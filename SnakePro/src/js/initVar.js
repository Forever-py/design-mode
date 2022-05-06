// 游戏场景 宽度系数-每一行有多少个方块    高度系数 控制一共有多少行
var XLEN = 30,
    YLEN = 30;

// 每个放款多宽
var SQUAREWIDTH = 20;

// 游戏场景的位置
var BASE_X_POINT = 200,
    BASE_Y_POINT = 200;

// 定义 蛇移动的时间间隔
var INTERVAL = 300;

// 定义方块
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}

Square.prototype.touch = function () {
    console.log('touch')
}

// 更新数据
Square.prototype.upDate = function (x,y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = y * SQUAREWIDTH + 'px';
}

var Floor = tool.extends(Square); // 地板
var Stone = tool.extends(Square); // 障碍物
var Food = tool.single(Square); // 食物
var SnakeHead = tool.single(Square); // 蛇头
var SnakeBody = tool.extends(Square); // 蛇身体
var Snake = tool.single(); // 蛇
var Ground = tool.single(Square); // 场景
// var Game = tool.single(Square); // 游戏进程

// 
var STRATEGYMESSAGEENUM = {
    MOVE: 'move',
    EAT: 'eat',
    DIE: 'die'
}
