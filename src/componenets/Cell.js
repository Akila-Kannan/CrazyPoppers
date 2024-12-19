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
          this.sprite.interactive = true;
          this.sprite.on("pointerdown", () => {
            console.log("on pointer down");
            this.grid.ResetPoppers();
            this.ReducePopers();
            this.grid.checkforWeights();
          });
          this.sprite.on("pointerover", () => {
            this.sprite.alpha = 0.8;
          });
          this.sprite.on("pointerout", () => {
            this.sprite.alpha = 1;
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
        this.sprite.anchor.set(0.5);
        console.log(this.position);
        console.log(
          "space",
          this.space +
            (this.position.x + 1) * Game.config.grid.cellwidth +
            Game.config.grid.cellwidth
        );
        console.log(
          " ",
          Game.config.grid.cellheight +
            this.position.y * Game.config.grid.cellheight +
            this.space
        );

        this.sprite.x =
          (this.position.x + 1) * this.space +
          (this.position.x + 1) * Game.config.grid.cellwidth; //
        this.sprite.y =
          this.position.y * Game.config.grid.cellheight +
          (this.position.y + 1) * this.space;
       
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
    console.log("texture update", texture);

  }

  enablePoper(container) {
    if (this.sprite) container.addChild(this.sprite);
  }

  disablePoper(container) {
    if (this.sprite) container.removeChild(this.sprite);
  }

  setpoperAnimation() {
    if (this.weight == 0) {
    }
  }

  update(deltaTime) {
    if (this.animateTransparent)
      this.sprite.alpha =
        this.sprite.alpha > 0 ? this.sprite.alpha - deltaTime : 0;
  }

  ReducePopers() {
    console.log(this.weight, "reduce popper");
    if (this.weight == 0) return;
    this.weight--;
    this.setPoppers();
    this.setpoperAnimation();
    this.grid.popNearerCells(this.gridindex.row, this.gridindex.col);
  }

}
