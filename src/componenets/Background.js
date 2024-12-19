import Game from "../core/Game";
import * as PIXI from 'pixi.js';

export class Background{

  constructor() {
      this.sprite = null;
      this.container = null;
    }

  setup(config,container) {
    console.log(config)
    const texture = PIXI.Texture.from(config.bg);
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.x = Game.WIDTH/2 ;
    this.sprite.y = Game.HEIGHT/2;
    this.container = container;
  }
  enable(){
    this.container.addChild(this.sprite);
  }
  disable(){
    this.container.removeChild(this.sprite);

  }

  update(delta) {
    
  }
}