import Game from "../core/Game";
import * as PIXI from "pixi.js";

export class Cell {
  constructor(data) {
    this.weight = data.weight;
    this.sprite = null;
    this.position = data.position;
    this.space = data.space;
    this.intialized = false;
    this.setPoppers();
    this.grid = data.grid;
    this.gridindex = data.gridindex;
    this.animateTransparent = false;
    this.spriteIncrementer = 1;
    this.spriteChangeIncr = 1;
    this.spriteLeftEye;
    this.spriteRightEye;
  }

  resetpoper() {
    this.spriteChangeIncr = 1;
  }

  setPoppers() {
    if (this.weight === 0 && !this.intialized) return;
    for (let i = 0; i < Game.config.poppers.head.length; i++) {
      if (Game.config.poppers.head[i].weight == this.weight) {
        const texture = PIXI.Texture.from(Game.config.poppers.head[i].path);
        if (!this.intialized) {
          this.sprite = new PIXI.Sprite(texture);
          this.spriteLeftEye = new PIXI.Sprite(
            PIXI.Texture.from(Game.config.poppers.eyes.left.path)
          );
          this.spriteRightEye = new PIXI.Sprite(
            PIXI.Texture.from(Game.config.poppers.eyes.right.path)
          );
          this.spriteLeftEye.anchor.set(0.5);
          this.spriteRightEye.anchor.set(0.5);
          this.sprite.anchor.set(0.5);
          this.sprite.x =
            (this.position.x + 1) * this.space +
            (this.position.x + 1) * Game.config.grid.cellwidth; //
          this.sprite.y =
            this.position.y * Game.config.grid.cellheight +
            (this.position.y + 1) * this.space;
          this.spriteLeftEye.x =
            this.sprite.x - Game.config.poppers.eyes.left.x;
          this.spriteLeftEye.y =
            this.sprite.y - Game.config.poppers.eyes.left.y;
          this.spriteRightEye.x =
            this.sprite.x + Game.config.poppers.eyes.right.x;
          this.spriteRightEye.y =
            this.sprite.y - Game.config.poppers.eyes.right.y;

          this.sprite.interactive = true;
          this.sprite.on("pointerdown", () => {
            this.grid.ResetPoppers();
            this.ReducePopers();
            this.grid.checkforWeights();
          });
          this.sprite.on("pointerover", () => {
            this.setAlpha(0.8);
          });
          this.sprite.on("pointerout", () => {
            this.setAlpha(1);
          });
          this.intialized = true;
        } else {
          setTimeout(
            this.replaceSprite.bind(this, this.weight),
            // this.replaceSprite(texture)
            this.spriteChangeIncr * 160
          );
          this.spriteChangeIncr++;
        }
      }
    }
  }

  replaceSprite(weight) {
    let texture;
    for (let i = 0; i < Game.config.poppers.head.length; i++) {
      if (Game.config.poppers.head[i].weight == weight) {
        texture = PIXI.Texture.from(Game.config.poppers.head[i].path);
      }
    }
    this.sprite.texture = texture;

    if (weight == 0)
      setTimeout(() => {
        this.animateTransparent = true;
      }, 100);
  }

  enablePoper(container) {
    if (this.sprite) container.addChild(this.sprite);
    if (this.spriteLeftEye) container.addChild(this.spriteLeftEye);
    if (this.spriteRightEye) container.addChild(this.spriteRightEye);
  }

  disablePoper(container) {
    if (this.sprite) container.removeChild(this.sprite);
  }

  setpoperAnimation() {
    if (this.weight == 0) {
    }
  }

  update(deltaTime) {
    if (this.animateTransparent) {
      const alpha = this.sprite.alpha > 0 ? this.sprite.alpha - deltaTime : 0;
      this.setAlpha(alpha);
    }
  }
  setAlpha(alpha) {
    this.sprite.alpha = alpha;
    this.spriteLeftEye.alpha = alpha;
    this.spriteRightEye.alpha = alpha;
  }
  ReducePopers() {
    if (this.weight == 0) return;
    this.weight--;
    this.setPoppers();
    this.setpoperAnimation();
    this.grid.popNearerCells(this.gridindex.row, this.gridindex.col);
  }
}
