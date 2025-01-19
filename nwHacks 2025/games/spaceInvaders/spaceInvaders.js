import EnemyController from "./enemyController.js";
import Player from "./Player.js";
import bulletController from "./bulletController.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "./images/space.png"

const enemyBulletController = new bulletController(canvas, 4, "white");
const playerBulletController = new bulletController(canvas, 20, "red");
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController)
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;

function game() {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    displayGameOver();
    if (!isGameOver) {
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
}

function displayGameOver() {
    if (isGameOver) {
        let text = didWin ? "You Win" : "Game Over";
        let textOffset = didWin ? 3.5 : 5;
    
        ctx.fillStyle = "white";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
      }
}

function checkGameOver() {
    if (isGameOver) {
        return;
    }

    if (enemyBulletController.collideWith(player)) {
        isGameOver = true;
    }

    if (enemyController.collideWith(player)) {
        isGameOver = true;
      }

    if (enemyController.enemyRows.length === 0) {
        didWin = true;
        isGameOver = true;
    }
}
// calling game loop 60 times every 1s
setInterval(game, 1000/60);