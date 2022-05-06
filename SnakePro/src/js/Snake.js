var oSnake = new Snake();
oSnake.head = null; // 头
oSnake.tail = null; // 尾

// 方向枚举
var DIRECTIONENUM = {
    LEFT: {
        x: -1,
        y: 0,
    },
    RIGHT: {
        x: 1,
        y: 0,
    },
    UP: {
        x: 0,
        y: -1,
    },
    DOWN: {
        x: 0,
        y: 1,
    }
}

oSnake.init = function (ground) {
    var snakeHead = SquareFactory.create("SnakeHead", 3, 1, 'deeppink');
    var snakeBody1 = SquareFactory.create("SnakeBody", 2, 1, 'pink');
    var snakeBody2 = SquareFactory.create("SnakeBody", 1, 1, 'pink');

    this.head = snakeHead;
    this.tail = snakeBody2;

    // 显示蛇
    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);
    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);
    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);

    // 链表  形成双向链表
    snakeHead.next = snakeBody1;
    snakeHead.last = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;

    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    // 默认方向
    this.direction = DIRECTIONENUM.RIGHT;
}

// 策略模式
oSnake.strategies = {
    move: function (snake, square, ground, fromEat) {
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'pink');
        newBody.next = snake.head.next;
        newBody.next.last = newBody;
        newBody.last = null;
        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        // 新建蛇头
        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'deeppink');
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;
        ground.remove(square.x, square.y);
        ground.append(newHead);

        // 删除尾巴
        if (!fromEat) {
            var newFloor = SquareFactory.create("Floor", snake.tail.x, snake.tail.y, 'orange');
            ground.remove(newFloor.x, newFloor.y);
            ground.append(newFloor)
            snake.tail = snake.tail.last;
            snake.tail.next = null;
        }
    },
    eat: function (snake, square, ground) { 
      this.move(snake, square, ground, true);
      createFood(oGround);
      oGame.score ++;
    },
    die: function () {
        oGame.over();
     },
}

// 做预判 以舌头为参考，根据自身方向 判断一下下一个碰到的方块是什么
oSnake.move = function (ground) {
    var square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    console.log(square.touch())
    if (typeof square.touch == 'function') {
        this.strategies[square.touch()](oSnake, square, ground, false);
    }
}