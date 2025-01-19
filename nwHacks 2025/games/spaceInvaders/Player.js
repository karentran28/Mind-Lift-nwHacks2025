export default class Player {

    rightPressed = false;
    leftPressed = false;
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
        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    draw(ctx) {
        if (this.shootPressed) {
            this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
            this.shootPressed = false; 
        }
        this.collideWalls()
        this.move()
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    collideWalls() {
        if (this.x < 0) {
          this.x = 0;
        }
        //player width = this.width
        if (this.x > this.canvas.width - this.width) {
          this.x = this.canvas.width - this.width;
        }
      }
    
    move() {
        if (this.rightPressed) {
            this.x += this.velocity;
        } else if (this.leftPressed) {
            this.x += -this.velocity;
        }
    }

    keydown = event => {
        if(event.code == 'ArrowRight') {
            this.rightPressed = true;
        }
        if(event.code == 'ArrowLeft') {
            this.leftPressed = true;
        }
        if (event.code == "Space") {
            console.log("space")
            this.shootPressed = true;
        }
    }

    keyup = event => {
        if(event.code == 'ArrowRight') {
            this.rightPressed = false;
        }
        if(event.code == 'ArrowLeft') {
            this.leftPressed = false;
        }
        if (event.code == "Space") {
            this.shootPressed ==false;
        }
    }
}