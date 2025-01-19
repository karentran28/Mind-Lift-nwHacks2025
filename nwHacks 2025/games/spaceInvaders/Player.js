export default class Player {
  shootPressed = false;

  constructor(canvas, velocity, bulletController) {
    this.canvas = canvas;
    this.velocity = velocity;

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 75;
    this.width = 32;
    this.height = 32;
    this.image = new Image();
    this.image.src = "./images/spaceship.png";
    this.bulletController = bulletController;
  }

  draw(ctx) {
    if (this.shootPressed) {
      this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
      this.shootPressed = false;
    }
    this.collideWalls();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  collideWalls() {
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y > this.canvas.height - this.height) {
      this.y = this.canvas.height - this.height;
    }
  }
}
