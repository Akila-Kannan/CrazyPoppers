import * as PIXI from "pixi.js";
import Loader from "./Loader";

class Game {
  static instance;

  constructor() {
    if (Game.instance) return Game.instance;
    Game.instance = this;
    // PIXI = window.devicePixelRatio || 1;
    this.window = window;

    const currentUrl = window.location.href; // Current URL
    const dataPath = "assets/data/config.json"; // Relative path

    // Construct the full URL
    const fullUrl = new URL(dataPath, currentUrl);
    this.config = Loader.loadJSON(fullUrl)
      .then((data) => {
        console.log("Config json data ", data);
        this.config = data;
      })
      .catch((error) => {
        console.error("Error loading JSON:", error);
      });
    this.app = new PIXI.Application({
      resizeTo: window, // Auto fill the screen
      autoDensity: true, // Handles high DPI screens
      backgroundColor: 0xffffff,
    });
    this.currentScene = null;
    this.prevScene = null;
    this.currentLevel = null;
    this.window.addEventListener("resize", () => {
      // Code to execute on window resize
      console.log("Window resized!");
      setTimeout(this.resize.bind(this), 100);
    });
  }
  async init() {
    await this.app.init({
      autoStart: false,
      resizeTo: window,
      sharedTicker: true,
    });
  }
  addCanvas() {
    document.body.appendChild(this.app.canvas);
    this.scenes = new Map();
  }

  changeScene(scene) {
    if (this.currentScene) this.currentScene.exit();
    this.prevScene = this.currentScene;
    this.currentScene = scene;
    console.log("scene ", scene);
    this.currentScene.enter();
    this.resize();
    this.app.stage.removeChildren();
    this.app.stage.addChild(scene.container);
    this.app.ticker.add((ticker) => {
      this.currentScene.update(ticker.deltaTime);
    });
  }
  resize() {
    console.log(this.currentScene);
    let container = this.currentScene.container;
    container.width = this.WIDTH;
    container.height = this.HEIGHT;
    container.scale.x = this.actualWidth() / this.WIDTH;
    container.scale.y = this.actualHeight() / this.HEIGHT;
    container.x = this.app.screen.width / 2 - this.actualWidth() / 2;
    container.y = this.app.screen.height / 2 - this.actualHeight() / 2;
  }
  get WIDTH() {
    return this.config.game.width;
  }

  get HEIGHT() {
    return this.config.game.height;
  }
  // The dynamic width and height lets us do some smart
  // scaling of the main game content; here we're just
  // using it to maintain a 9:16 aspect ratio and giving
  // our scenes a 375x667 stage to work with
  actualWidth() {
    const { width, height } = this.app.screen;
    const isWidthConstrained = width < (height * 9) / 16;
    return isWidthConstrained ? width : (height * 9) / 16;
  }

  actualHeight() {
    const { width, height } = this.app.screen;
    const isHeightConstrained = (width * 16) / 9 > height;
    return isHeightConstrained ? height : (width * 16) / 9;
  }
  handleWin() {
    this.currentScene.handleWin();
  }
  addScene(name, scene) {
    this.scenes.set(name, scene);
  }
  changeSceneWithName(sceneName) {
    this.changeScene(this.scenes.get(sceneName));
  }
}

export default new Game();
