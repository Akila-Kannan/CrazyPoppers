import Game from './core/Game';
import Loader from './core/Loader';
import { Level } from './scenes/Level';
import { Menu } from './scenes/Menu';

const game = Game;
console.log("Game intiating",game);
try{
  await game.app.init({
      autoStart: false,
      resizeTo: window,
     sharedTicker: true,
   });
  }
catch(error){
  console.log("error ",error);
}
console.log("game intiated")

game.addCanvas();

let assets =await Loader.asset.load(["assets/sprites/popper-background.jpg",Game.config.button.path])
for(let i=0; i< game.config.poppers.head.length;i++)
  assets =await Loader.asset.load(game.config.poppers.head[i].path)
console.log("images loadded")

const menu = new Menu(game.config)
game.changeScene(menu);
Game.addScene("menu",menu);

