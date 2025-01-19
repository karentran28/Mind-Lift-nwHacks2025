import Enemy from "./Enemy.js";
import MovingDirections from "./movingDirection.js";
export default class EnemyController {

    enemyMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    enemyRows = [];

    currentDirection = MovingDirections.right;
    xVelocity = 0;
    yVelocity = 0;
    defaultXVelocity = 1;
    defaultYVelocity = 1;
    moveDownTimerDefault = 30;
    moveDownTimer = this.moveDownTimerDefault;

    fireBulletTimerDefault = 100;
    fireBulletTimer = this.fireBulletTimerDefault;

    constructor(canvas, enemyBulletController, playerBulletController) {
        this.canvas = canvas;
        this.enemyBulletController = enemyBulletController;
        this.playerBulletController = playerBulletController;
        this.createEnemies();

    }

    draw(ctx) {
        this.resetMoveDownTimer();
        this.decrementMoveDownTimer();
        this.updateVelocityAndDirection();
        this.collisionDetection();
        this.drawEnemies(ctx);
        this.fireBullet();
    }

    collisionDetection() {
        this.enemyRows.forEach((enemyRow) => {
          enemyRow.forEach((enemy, enemyIndex) => {
            if (this.playerBulletController.collideWith(enemy)) {
              enemyRow.splice(enemyIndex, 1);
            }
          });
        });
    
        this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
    }

    fireBullet() {
        this.fireBulletTimer--;
        if (this.fireBulletTimer <= 0) {
          this.fireBulletTimer = this.fireBulletTimerDefault;
          const allEnemies = this.enemyRows.flat();
          const enemyIndex = Math.floor(Math.random() * allEnemies.length);
          const enemy = allEnemies[enemyIndex];
          this.enemyBulletController.shoot(enemy.x, enemy.y, -3);
        }
    }
    

    resetMoveDownTimer() {
        if (this.moveDownTimer <= 0) {
            this.moveDownTimer = this.moveDownTimerDefault
        }
    }

    decrementMoveDownTimer() {
        if (this.currentDirection === MovingDirections.downLeft ||
            this.currentDirection === MovingDirections.downRight
        ) {
            this.moveDownTimer--;
        }
    }

    updateVelocityAndDirection() {
        for(const enemyRow of this.enemyRows) {
            if (this.currentDirection == MovingDirections.right) {
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                const rightMostEnemy = enemyRow[enemyRow.length - 1];
                if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
                    this.currentDirection = MovingDirections.downLeft;
                    break;
                }
            } else if (this.currentDirection === MovingDirections.downLeft) {
                if (this.moveDown(MovingDirections.left)) {
                    break;
                }
            } else if (this.currentDirection === MovingDirections.left) {
                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity = 0;
                const leftMostEnemy = enemyRow[0];
                if (leftMostEnemy.x <= 0) {
                    this.currentDirection = MovingDirections.downRight;
                    break;
                }
            } else if (this.currentDirection === MovingDirections.downRight) {
                if (this.moveDown(MovingDirections.right)) {
                    break;
                }
            }
        }
    }

    moveDown(newDirection) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if (this.moveDownTimer <= 0) {
            this.currentDirection = newDirection;
            return true;
        }
        return false;
    }

    drawEnemies(ctx) {
        this.enemyRows.flat().forEach((enemy) => {
            enemy.move(this.xVelocity, this.yVelocity)
            enemy.draw(ctx);
        })
    }

    collideWith(sprite) {
        return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
    }

    createEnemies() {
        this.enemyMap.forEach((row, rowIndex) => {
            this.enemyRows[rowIndex] = [];
            row.forEach((number, enemyIndex) => {
                if (number == 1) {
                    this.enemyRows[rowIndex].push(
                        new Enemy(enemyIndex* 50, rowIndex * 35, number))
                }
            })
        })
    }
}

