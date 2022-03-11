const CELL_SIZE = 20;
const CANVAS_SIZE = 800;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
MOVE_INTERVAL = 150;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{ x: head.x, y: head.y }];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
        live: 3,
        level: 1,
    }
}
let snake1 = initSnake("purple");
let snake2 = initSnake("blue");

let apple = {
    color: "red",
    position: initPosition(),
}
let apple1 = {
    color: "red",
    position: initPosition(),
}

let live = {
    color: "blue",
    position: initPosition(),
}

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    } else {
        scoreCanvas = document.getElementById("score2Board");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function drawLive(snake) {
    let liveCanvas;
    if (snake.color == snake1.color) {
        liveCanvas = document.getElementById("liveBoard");
    }
    let liveCtx = liveCanvas.getContext("2d");

    liveCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    liveCtx.font = "30px Arial";
    liveCtx.fillStyle = snake.color
    liveCtx.fillText(snake.live, 10, liveCanvas.scrollHeight / 2);
    if (checkCollision(snake1)) {
        snake1.live--;
    }

}

function drawLevel(snake) {
    let levelCanvas;
    if (snake.color == snake1.color) {
        levelCanvas = document.getElementById("levelBoard");
    }
    let levelCtx = levelCanvas.getContext("2d");

    levelCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    levelCtx.font = "30px Arial";
    levelCtx.fillStyle = snake.color
    levelCtx.fillText(snake.level, 10, levelCanvas.scrollHeight / 2);
    var levels = snake.score;

    switch (levels) {
        case 5:
            snake.level = 2;
            MOVE_INTERVAL = 130;
            break;
        case 10:
            snake.level = 3;
            MOVE_INTERVAL = 110;
            break;
        case 15:
            snake.level = 4;
            MOVE_INTERVAL = 90;
            break;
        case 20:
            snake.level = 5;
            MOVE_INTERVAL = 70;
            break;

    }

}

function isPrime(num) {

    if (num === 2) {
        return true;
    } else if (num > 1) {
        for (var i = 2; i < num; i++) {

            if (num % i !== 0) {
                return true;
            } else if (num === i * i) {
                return false
            } else {
                return false;
            }
        }
    } else {
        return false;
    }

}



function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");

        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        drawCell(ctx, snake1.head.x, snake1.head.y, snake1.color);
        for (let i = 1; i < snake1.body.length; i++) {
            drawCell(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
        }


        if (isPrime(snake1.score)) {
            drawCell(ctx, live.position.x, live.position.y, live.color);
        }
        drawCell(ctx, apple.position.x, apple.position.y, apple.color);
        drawCell(ctx, apple1.position.x, apple1.position.y, apple1.color);
        // drawCell(ctx, live.position.x, live.position.y, live.color);


        drawScore(snake1);
        drawLive(snake1);
        drawLevel(snake1);

        var level = snake1.level;
        switch (level) {
            case 2:
                for (let j = 1; j < 30; j++) {
                    var x = 10;
                    drawCell(ctx, j, 10, snake1.color);
                }
                break;
            case 3:
                for (let j = 1; j < 30; j++) {
                    var x = 10;
                    drawCell(ctx, j, 10, snake1.color);
                }
                break;
            case 4:
                for (let j = 1; j < 30; j++) {
                    var x = 10;
                    drawCell(ctx, j, 10, snake1.color);
                }
                break;
            case 5:
                for (let j = 1; j < 30; j++) {
                    var x = 10;
                    drawCell(ctx, j, 10, snake1.color);
                }
                break;
        }


    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

function eat(snake, apple) {
    if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
        apple.position = initPosition();
        snake.score++;
        snake.body.push({ x: snake.head.x, y: snake.head.y });
    }
}

function eat(snake, apple1) {
    if (snake.head.x == apple1.position.x && snake.head.y == apple1.position.y) {
        apple1.position = initPosition();
        snake.score++;
        snake.body.push({ x: snake.head.x, y: snake.head.y });
    }
}

function eatlive(snake, live) {
    if (snake.head.x == live.position.x && snake.head.y == live.position.y) {
        live.position = initPosition();
        snake.live++;
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple);
    eat(snake, apple1);
    eatlive(snake, live);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple);
    eat(snake, apple1);
    eatlive(snake, live);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple);
    eat(snake, apple1);
    eatlive(snake, live);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple);
    eat(snake, apple1);
    eatlive(snake, live);
}

function checkLive(snake) {
    let isEatLive = false;
    if (!isEatLive) {
        drawCell(ctx, live.position.x, live.position.y, live.color);
        isEatLive = true;
    }

}



function checkCollision(snakes) {
    let isCollide = false;
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
                for (let j = 1; j < 30; j++) {
                    if (snakes[i].head.x == j && snakes[i].head.y == 10 && snakes[i].level == 2) {
                        isCollide = true;
                    }
                }


            }
        }
    }
    if (isCollide) {
        snake1.live--;
        if (snake1.live <= 0) {
            alert("Game over");
            window.location.reload();

        }
    }
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    if (!checkCollision([snake1, snake2])) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        console.log("collide", snake.color);
        if (snake == snake1) {
            snake1 = initSnake("purple");
            setTimeout(function() {
                move(snake1);
            }, MOVE_INTERVAL);
        } else {
            snake2 = initSnake("blue");
            setTimeout(function() {
                move(snake2);
            }, MOVE_INTERVAL);
        }
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }
})


function initGame() {
    move(snake1);
    // level(snake1);
    // move(snake2);
}



initGame();