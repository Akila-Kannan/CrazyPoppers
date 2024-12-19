import { Background } from "../componenets/Background";
import { Button } from "../componenets/Button";
import Game from "../core/Game";
import { Level } from "./Level";
import { Scene } from "./Scene";

export class Menu extends Scene {
  constructor() {
    super();
    this.game = Game;
    this.levelbuttons = [];
    console.log("level", this.game.config.level.length);
    this.bg = new Background();
    console.log("bg ", Game.config.bg.default);
    this.bg.setup(Game.config.bg.default, this.container);
    this.bg.enable();
    for (let i = 0; i < this.game.config.level.length; i++) {
      let data = this.game.config.button;
      data.text = this.game.config.text;
      data.level = i + 1;
      let button = new Button(data, this.container);
      button.onclick(this.onclick.bind(this, i));
      button.setText(data.level);
      button.setTextColor("000000ff");
      button.enable();
      button.setPos(i * data.width - 100 + i * 20, data.height + 100);
      this.levelbuttons.push(button);
    }
  }
  
  onclick(level) {
    console.log("level ", level);
    Game.currentLevel = level + 1;
    this.game.changeScene(new Level(this.game.config));
  }
}
