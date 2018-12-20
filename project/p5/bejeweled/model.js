function horizontalChainAt(grid, position) {
    let beginPosition = horizontalChainStartPositionAt(grid, position)
    let colour = grid[position.y][position.x]
    let result = 0
    for (let i = beginPosition.x; i != grid[0].length;i++) {
        if (grid[position.y][i] === colour){
            result++
        }
    }
    return result
}


function swap(grid, p, q) {
    console.log("called swap")
    let temp = grid[p.y][p.x]
    grid[p.y][p.x] = grid[q.y][q.x]
    grid[q.y][q.x] = temp
}

function verticalChainAt(grid, position) {
    let beginPosition = verticalChainStartPositionAt(grid, position)
    let colour = grid[position.y][position.x].colour
    let result = 0
    for (let i = beginPosition.y; i != grid.length;i++) {
        if (grid[i][position.x].colour === colour){
            result++
        }
    }
    return result
}

function horizontalChainStartPositionAt(grid, position) {
    let colour = grid[position.y][position.x].colour
    let beginX = -1
    for(let i = position.x; i>=0; i--){
        if (grid[position.y][i].colour === colour){
            beginX = i
        }
    }
    return {x: beginX, y: position.y}
}

function verticalChainStartPositionAt(grid, position) {
    let colour = grid[position.y][position.x]
    let beginY = -1
    for(let i = position.y; i>=0; i--){
        if (grid[i][position.x] === colour){
            beginY = i
        }
    }
    return {x: position.x, y: beginY}
}

function checkMove(grid, p, q) {
    // zien of deze move mag gebeuren
    if((q.y == p.y+1 && q.x == p.x) || (q.y == p.y-1 && q.x == p.x) || (q.x == p.x+1 && q.y == p.y) || (q.x == p.x-1 && q.y == p.y)) {
        swap(grid, p, q);
        let h = horizontalChainAt(grid, {x:p.x, y: q.y});
        let v = verticalChainAt(grid, {x:p.x, y: q.y});
        if(h < 3 && v < 3){
            swap(grid, q, p);
        }
    }

}

function mousePressed(){
    if(mouseButton === LEFT && board.sourcePos == null){
        board.sourcePos = translateMousePos()
        
    } else if (mouseButton == LEFT) {
        board.targetPos = translateMousePos()
        checkMove(grid, board.sourcePos, board.targetPos)
        redraw()
    }
    if(mouseButton === RIGHT){
        board.sourcePos = null
        board.targetPos = null
    }
}

function translateMousePos(){
    return {x:Math.floor(mouseX / (canvas.width/8)),y:Math.floor(mouseY / (canvas.height/8))}
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