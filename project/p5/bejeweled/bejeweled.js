//creating a grid and filling it with jewels
function createGrid(rows,collumns){
    var grid = Array(rows)
    for(var i = 0;i<rows;i++){
        grid[i] = new Array(collumns)
    }
    return grid
}

function setup(){
    createCanvas(400,400);

}
let grid = createGrid(8,6)
let diameter= 10

function draw(){
    background('black')
    fill('red')

    for(let i = 0;i<grid[0].length;i++){
        for(let j = 0; j<grid.length;j++){
            ellipse(20+(i*50),20+(j*50),30,30)
        }
    }


                    }