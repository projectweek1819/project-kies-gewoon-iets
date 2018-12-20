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
        
    } else if (mouseButton == left) {
        board.targetPos = translateMousePos()
    }
    if(mouseButton === RIGHT){
        board.sourcePos = null
        board.targetPos = null
    }
}

function translateMousePos(){
    return {x:Math.floor(mouseX / (canvas.width/8)),y:Math.floor(mouseX / (canvas.height/8))}
}


function score(grid) {
    // een chain is vanaf 3 tot en met 5
    let res = 0;
    let n = horizontalChainAt(grid, board.sourcePos);
    let m = verticalChainAt(grid, board.sourcePos);

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