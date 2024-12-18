import { Scene } from './Scene';
import * as PIXI from 'pixi.js';
import {Background } from '../componenets/Background'
import { Grid } from '../componenets/Grid';
import Game from "../core/Game"
import Text from "../componenets/Text"

export class Level extends Scene {
  constructor(config) {
    super(config);
  }
  enter() {
    this.bg = new Background();
    console.log(this.config.level[Game.currentLevel -1])
    this.bg.setup(this.config.level[Game.currentLevel-1],this.container);
    this.bg.enable();
    this.grid = new Grid(this.config.level[Game.currentLevel -1]);
    this.container.x = Game.config.game.width/2;
    this.container.y = Game.config.game.height/2;
    this.grid.enableGrid(this.container);
    this.text = new Text("Game Won",true,this.container);
    this.text.setPos( Game.config.game.width/2,Game.config.game.height/2)

  }
  update(delta) {
    this.bg.update(delta);
    this.grid.update();
  }
  handleWin(){
    setTimeout(()=>
    this.text.enable(),(1000));
    setTimeout(()=>Game.changeSceneWithName("menu"), (  3 * 1000));
  }
}
