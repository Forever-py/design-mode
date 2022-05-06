var oGround = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH);
oGround.init = function () {
    this.viewContent.style.position = "absolute";
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.backgroundColor = '#0ff';
    document.body.appendChild(this.viewContent);

    this.SquareTable = [];
    for (var y = 0; y < YLEN; y++) {
        this.SquareTable[y] = new Array(this.XLEN);
        for (var x = 0; x < XLEN; x++) {
            if (x == 0 || x == XLEN - 1 || y == 0 || y == YLEN - 1) {
                var newSquare = SquareFactory.create('Stone', x, y, 'black');
            } else {
                var newSquare = SquareFactory.create('Floor', x, y, 'orange');
            }
            this.SquareTable[y][x] = newSquare;
            this.viewContent.appendChild(newSquare.viewContent);
        }
    }
}

// 移除某个方块
oGround.remove = function (x, y) {
    // 视觉上把div移除
    this.viewContent.removeChild(this.SquareTable[y][x].viewContent);
    // 数据移除
    this.SquareTable[y][x] = null;
}

// 添加某个方块
oGround.append = function (square) {
    this.viewContent.appendChild(square.viewContent);
    this.SquareTable[square.y][square.x] = square;
}
