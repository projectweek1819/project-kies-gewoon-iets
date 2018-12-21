function swap(grid, p, q) {
    console.log("called swap")
    let temp = grid[p.y][p.x]
    grid[p.y][p.x] = grid[q.y][q.x]
    grid[q.y][q.x] = temp
    return grid
}

function horizontalChainAt(grid,position){
    var count = 1
    var i = 1
    while(grid[position.y][position.x].colour === grid[position.y][position.x+i].colour){
        i++
        count++
    }
    i = 1
    while(grid[position.y][position.x].colour === grid[position.y][position.x-i].colour){
        i++
        count++
    }
    return count
}

function verticalChainAt(grid,position){
    var count = 1
    var i = 1
    while(position.y-i >= 0 && grid[position.y][position.x].colour === grid[position.y-i][position.x].colour){
        i++
        count++ 
    }
    i = 1
    while(position.y+i < grid.length && grid[position.y][position.x].colour === grid[position.y+i][position.x].colour){
        i++
        count++
    }
    return count
}


function checkMove(grid, p, q) {
    // zien of deze move mag gebeuren
    console.log(p, q)
    if((q.y == p.y+1 && q.x == p.x) || (q.y == p.y-1 && q.x == p.x) || (q.x == p.x+1 && q.y == p.y) || (q.x == p.x-1 && q.y == p.y)) {
        console.log(grid)
        grid = swap(grid, p, q);
        console.log(grid)
        let h = horizontalChainAt(grid, {x:q.x, y: q.y});
        let v = verticalChainAt(grid, {x:q.x, y: q.y});
        console.log("h: "+h)
        console.log("v: "+v)
        if(h < 3 && v < 3){
            grid = swap(grid, q, p);
        }
    }

}

function mousePressed(){
    if(mouseButton === LEFT && board.sourcePos == null){
        board.sourcePos = translateMousePos()
        
    } else if (mouseButton == LEFT) {
        board.targetPos = translateMousePos()
        console.log(grid    )
        checkMove(grid, board.sourcePos, board.targetPos)
        redraw()
    }
    if(mouseButton === RIGHT){
        board.sourcePos = null
        board.targetPos = null
    }
}

function translateMousePos(){
    return {x:Math.floor(mouseY / (canvas.width/8)),y:Math.floor(mouseX / (canvas.height/8))}
}


function score(grid) {
    // een chain is vanaf 3 tot en met 5
    let res = 0;
    let n = horizontalChainAt(grid, board.targetPos);
    let m = verticalChainAt(grid, board.targetPos);

    if(n >= 3){
        res += n;
    }
    if(m >= 3){
        res += m;
    }
    switch(parameter){
        case 3: res += 3;
            break
        case 4: res += 4;
            break;
        case 5: res += 5;
    }
    return res;
}