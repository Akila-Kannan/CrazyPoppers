import { Container } from 'pixi.js';
import { State } from '../core/State';

export class Scene extends State {
  constructor(config) {
    super();
    this.container = new Container();
    this.config = config;
    this.bg = null;
  }
  handleWin(){
        
  }
}
