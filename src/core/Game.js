import * as PIXI from "pixi.js";
import Loader from "./Loader";
import { Menu } from "../scenes/Menu";

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
        this.config = data;
        this.loadAssetsAndIntialScreen();
      })
      .catch((error) => {
        console.error("Error: Loading Json ", error);
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
      setTimeout(this.resize.bind(this), 100);
    });
    this.init();
  }

  async init() {
    await this.app.init({
      autoStart: false,
      resizeTo: window,
      sharedTicker: true,
    });
    this.addCanvas();
  }

  async loadAssetsAndIntialScreen() {
    let assets = await Loader.asset.load([
      this.config.bg.default.bg,
      this.config.button.path,
      this.config.poppers.eyes.left.path,
      this.config.poppers.eyes.right.path,
    ]);
    for (let i = 0; i < this.config.poppers.head.length; i++)
      assets = await Loader.asset.load(this.config.poppers.head[i].path);
    // Adding Main Scene
    const menu = new Menu(this.config);
    this.changeScene(menu);
    this.addScene("menu", menu);
  }
  addCanvas() {
    document.body.appendChild(this.app.canvas);
    this.scenes = new Map();
  }

  changeScene(scene) {
    if (this.currentScene) this.currentScene.exit();
    this.prevScene = this.currentScene;
    this.currentScene = scene;
    this.currentScene.enter();
    this.resize();
    this.app.stage.removeChildren();
    this.app.stage.addChild(scene.container);
    this.app.ticker.add((ticker) => {
      this.currentScene.update(ticker.deltaTime);
    });
  }
  resize() {
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
