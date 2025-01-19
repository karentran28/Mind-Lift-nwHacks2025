import EnemyController from "./enemyController.js";
import Player from "./Player.js";
import bulletController from "./bulletController.js";
import { setupGestureControl } from "./gestureControl.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 1000;

const background = new Image();
background.src = "./images/space.png";

const enemyBulletController = new bulletController(canvas, 4, "white");
const playerBulletController = new bulletController(canvas, 20, "red");
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 3, playerBulletController);

// IMPORTANT
setupGestureControl(player);

let isGameOver = false;
let didWin = false;

function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
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
    const text = didWin ? "You Win" : "Game Over";
    const textOffset = didWin ? 3.5 : 5;

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

// Call game loop 60 times per second
setInterval(game, 1000 / 60);
