import { Assets, Loader } from "pixi.js";
import * as PIXI from "pixi.js";
class ResourceLoader {
  static instance;

  constructor() {
    if (ResourceLoader.instance) return ResourceLoader.instance;
    ResourceLoader.instance = this;
    this.loader = new PIXI.Loader();
    this.asset = Assets;
  }

  load(resources, onComplete) {
    resources.forEach((res) => {
      this.loader.add(/*res.name,*/ res.path, onComplete);
    });
    this.loader.load(onComplete);
  }

  async loadJSON(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}

export default new ResourceLoader();
