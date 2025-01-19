import Bullet from "./Bullet.js";
export default class bulletController {
  bullets = [];
  timeTillNextBulletAllowed = 100;

  constructor(canvas, maxBullets, bulletColour) {
    this.canvas = canvas;
    this.maxBullets = maxBullets;
    this.bulletColour = bulletColour;
  }

  draw(ctx) {
    this.bullets = this.bullets.filter(
      (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
    );

    this.bullets.forEach((bullet) => bullet.draw(ctx));
    if (this.timeTillNextBulletAllowed > 0) {
      this.timeTillNextBulletAllowed--;
    }
  }

  collideWith(sprite) {
    const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) =>
      bullet.collideWith(sprite)
    );

    if (bulletThatHitSpriteIndex >= 0) {
      this.bullets.splice(bulletThatHitSpriteIndex, 1);
      return true;
    }

    return false;
  }

  shoot(x, y, velocity, timeTillNextBulletAllowed = 5) {
    if (
      this.timeTillNextBulletAllowed <= 0 &&
      this.bullets.length < this.maxBullets
    ) {
      const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColour);
      this.bullets.push(bullet);
      this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
    }
  }
}
