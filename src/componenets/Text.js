import Game from "../core/Game";
import * as PIXI from "pixi.js";

export default class Text {
  constructor(textToDisplay, defaultFont, container, customFont = null) {
    if (defaultFont) {
      this.text = new PIXI.Text(textToDisplay, {
        fontFamily: Game.config.text.fontFamily,
        fontSize: Game.config.text.fontSize,
        fill: Game.config.text.color, // White color
        align: Game.config.text.align,
      });
    } else {
      this.text = new PIXI.Text(textToDisplay, {
        fontFamily: customFont.fontFamily,
        fontSize: customFont.fontSize,
        // fill: customFont.color, // White color
        align: customFont.align,
      });
    }
    this.text.anchor.set(0.5);
    this.container = container;
    console.log("color ", this.text);
  }
  setColor(color) {
    console.log("color ", this.text);
    // this.text.localColor = color;
    this.text.style.fill = color;
  }
  setPos(x, y) {
    this.text.x = x;
    this.text.y = y;
  }
  setWidth(width, height) {
    this.text.width = width;
    this.text.height = height;
  }
  setText(txt) {
    this.text.text = txt;
  }
  enable() {
    this.container.addChild(this.text);
  }
  disable() {
    this.container.removeChild(this.text);
  }
}
