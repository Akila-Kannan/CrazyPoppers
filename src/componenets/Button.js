import * as PIXI from 'pixi.js';
import Game from "../core/Game";
import Text from './Text';
export class Button  {
    constructor(data,container){
       this.image = null;  
       this.sprite = null;
       this.text = null;
       this.data = data;
       this.container = container;
       if(data.path){
        const texture = PIXI.Texture.from(data.path);
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.anchor.set(0.5);
        this.sprite.x = data.width/2  ;
        this.sprite.y = data.height/2;
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.sprite.width = data.width;
        this.sprite.height = data.height;

        this.sprite.on("pointerup", () => {
            this.sprite.tint = 0xffffff; 
          });
          this.sprite.on("pointerover", () => {
            this.sprite.alpha = 0.8; 
          });
          this.sprite.on("pointerout", () => {
            this.sprite.alpha = 1;
          });
        if(data.text){
            this.text = new Text("",true,this.container)
            this.text.setPos(data.width/2,data.height/2);
        }
          
       }   
       else{
        console.error ("missing image path");
       }
    }
    enable(){
        this.container.addChild(this.sprite);
        this.text.enable();
    }
    setTextColor(color){
        this.text.setColor(color);
    }
    setPos(x,y){
        this.sprite.x = x,
        this.sprite.y = y;  
        this.text.setPos(x,y);


    }
    setText(txt){
        this.text.setText(txt);
    }
    disable(){
        this.container.removeChild(this.sprite);
        this.text.disable();
    }
    onclick(func){
        this.sprite.on("pointerdown", () => {
            console.log("Button clicked!");
            this.sprite.tint = 0x999999; 
            Game.currentLevel = this.data.level
            func();
          });
    }
}