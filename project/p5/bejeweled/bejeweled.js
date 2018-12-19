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
    for(var y = 0; y != width(grid); y++){
        for(var x = 0; x != height(grid); x++){
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


function setup(){
    createCanvas(402,402);
    noLoop()
}
let grid = createGrid(8,6)
fillGrid(grid)
console.log(grid)
let diameter= 30

function draw(){
    background('black')
    for(let i = 0;i<grid[0].length;i++){
        for(let j = 0; j<grid.length;j++){
            console.log(grid[i][j])
            fill(grid[i][j].colour)
            ellipse(20+(i*50),20+(j*50),diameter,diameter)
        }
    }
}