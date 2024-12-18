import Game from './core/Game';
import Loader from './core/Loader';
import { Level } from './scenes/Level';
import { Menu } from './scenes/Menu';

const game = Game;
  await game.app.init({
      autoStart: false,
      resizeTo: window,
     sharedTicker: true,
   });
  game.addCanvas();
  let assets =await Loader.asset.load(["public/assets/sprites/popper-background.jpg",Game.config.button.path])
  for(let i=0; i< game.config.poppers.head.length;i++)
    assets =await Loader.asset.load(game.config.poppers.head[i].path)
  const menu = new Menu(game.config)
  game.changeScene(menu);
  Game.addScene("menu",menu);

