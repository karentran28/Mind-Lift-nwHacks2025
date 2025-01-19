const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 10;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = getRandomFoodPosition();
let direction = { x: 0, y: 0 };
let newDirection = { x: 0, y: 0 };
let gameOver = false;
let score = 0;

function gameLoop() {
    if (gameOver) {
        displayGameOver();
        return;
    }

    update();
    draw();

    setTimeout(gameLoop, 75);
}

function displayGameOver() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 4, canvas.height / 2 - 20);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Final Score: ${score}`, canvas.width / 3, canvas.height / 2 + 10);
    ctx.fillText("Press 'R' to Restart", canvas.width / 4.5, canvas.height / 2 + 40);
}

function update() {
    if (newDirection.x !== -direction.x || newDirection.y !== -direction.y) {
        direction = newDirection;
    }

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check for collisions with walls or itself
    if (
        head.x < 0 || head.y < 0 ||
        head.x >= tileCount || head.y >= tileCount ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameOver = true;
        return;
    }

    snake.unshift(head);

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        score += 100;
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = "lime";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function getRandomFoodPosition() {
    let position;
    while (true) {
        position = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
        };

        // Ensure the food doesn't spawn on the snake
        if (!snake.some(segment => segment.x === position.x && segment.y === position.y)) {
            break;
        }
    }
    return position;
}

function restartGame() {
    snake = [{ x: 10, y: 10 }];
    food = getRandomFoodPosition();
    direction = { x: 0, y: 0 };
    newDirection = { x: 0, y: 0 };
    gameOver = false;
    score = 0;
    gameLoop();
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            newDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            newDirection = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            newDirection = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            newDirection = { x: 1, y: 0 };
            break;
        case 'r':
        case 'R':
            if (gameOver) {
                restartGame();
            }
            break;
    }
});

gameLoop();
