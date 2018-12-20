//creating a grid and filling it with jewels
function createGrid(rows,collumns){
    var grid = Array(rows)
    for(var i = 0;i<rows;i++){
        grid[i] = new Array(collumns)
    }
    return grid
}

function width(grid) {
    return grid[0].length
}

function height(grid) {
    return grid.length
}

function fillGrid(grid){
    for(var y = 0; y != grid.length; y++){
        for(var x = 0; x != grid[0].length; x++){
            if(grid[y][x] == null || grid[y][x].colour === ""){
                switch(Math.floor(Math.random()*6+1)){
                    case 1:
                        grid[y][x] = new Gem("red",false,false)
                        break;
                    case 2:
                        grid[y][x] = new Gem("blue",false,false)
                        break;
                    case 4:
                        grid[y][x] = new Gem("green",false,false)
                        break;
                    case 5:
                        grid[y][x] = new Gem("yellow",false,false)
                        break;
                    default:
                        grid[y][x] = new Gem("purple",false,false)
                        break;
                }
            }
        }
    }
}
var board
var canvas

function setup(){
    canvas = createCanvas(402,402);
    noLoop()
    board = new Board(null,null,0)
}
let grid = createGrid(8,8)
fillGrid(grid)
let diameter= 30

function populateBoard() {
    background('black')
    for(let i = 0;i<grid.length;i++){
        for(let j = 0; j<grid[0].length;j++){
            fill(grid[i][j].colour)
            ellipse(20+(i*50),20+(j*50),diameter,diameter)
        }
    }
}

function draw(){
    populateBoard()
}

function restart(){
    clear();
    for(let a=0;a<grid[0].length;a++){
        for(let b = 0;b<grid.length;b++){
            grid[b][a]= null
        }
        
    }
    fillGrid(grid)
    redraw()
}
var audio = new Audio('arcade_level_165_proud_music_preview.mp3');

function music(){
        audio.play();
    
    
}
function music2(){
        audio.pause();
}