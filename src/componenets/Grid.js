import { Cell } from "./Cell";
import Game from "../core/Game"
import { Container } from 'pixi.js';


export class Grid{
    constructor(leveldata){
        console.log(leveldata)
        this.cells= [];
        this.row= Game.config.grid.row;
        this.col = Game.config.grid.col;
        this.space = Game.config.grid.space;
        this.cellcount =0;
        for (let i=0; i< Game.config.grid.row; i++){
            let row =[];
            for (let j=0; j< Game.config.grid.col; j++){
                let gridData ={weight: leveldata.grid[i][j],position:{x: i,y:j},gridindex:{row:i,col:j},grid: this,space:this.space};
                let cell =  new Cell(gridData);
                row.push (cell);
                this.cellcount++;
            }
            this.cells.push(row);
        }
        this.container = new Container();
        this.container.x = Game.config.grid.x;
        this.container.y = Game.config.grid.y;
        console.log(this.cells);
        console.log(this.container);

        // this.container.anchor.set(0.5);

    }
    enableGrid(container){
        
        for (let i=0; i< Game.config.grid.row; i++){
            for (let j=0; j< Game.config.grid.col; j++){
                this.cells[i][j].enablePoper(this.container);
                // this.cells[i][j].enablePoper(container);
                

            }
        }
        container.addChild(this.container);
    }

    popNearerCells(row,col){
        if(row-1 >=0 && col-1 >=0  && row-1 <this.row && col-1 <this.col )
            this.cells[row-1][ col-1].ReducePopers();

        if(row-1 >=0 && col >=0  && row-1 <this.row && col <this.col)
            this.cells[row-1][col].ReducePopers();

        if(row-1 >=0 && col+1 >=0 &&  row-1 <this.row && col+1 <this.col)
            this.cells[row-1][col+1].ReducePopers();

        if(row >=0 && col-1 >=0 && row<this.row && col-1 <this.col)
            this.cells[row][col-1].ReducePopers();

        if(row >=0 && col+1 >=0 && row <this.row && col+1 <this.col)
            this.cells[row][col+1].ReducePopers();

        if(row+1 >=0 && col-1 >=0 &&  row+1 <this.row && col-1 <this.col)
            this.cells[row+1][col-1].ReducePopers();
        
        if(row+1 >=0 && col >=0 && row+1 <this.row && col<this.col)
            this.cells[row+1][col].ReducePopers();
        
        if(row+1 >=0 && col+1 >=0 && row+1 <this.row && col+1 <this.col)
            this.cells[row+1][col+1].ReducePopers();
     
    }
    update(deltaTime){
        for (let i=0; i< Game.config.grid.row; i++){
            for (let j=0; j< Game.config.grid.col; j++){
                this.cells[i][j].update(deltaTime);
            }
        }
    }
    checkforWeights(){
        let count =0;
        for (let i=0; i< Game.config.grid.row; i++){
            for (let j=0; j< Game.config.grid.col; j++){
                count = this.cells[i][j].weight === 0? count+1: 0;
            }
        }
        if(count === this.cellcount ) 
            Game.handleWin();
    }
    ResetPoppers(){
        for (let i=0; i< Game.config.grid.row; i++){
            for (let j=0; j< Game.config.grid.col; j++){
                this.cells[i][j].resetpoper();
            }
        }
    }
}