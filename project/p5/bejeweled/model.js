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
    while(position.x+i < grid[0].length && grid[position.y][position.x].colour === grid[position.y][position.x+i].colour){
        i++
        count++
    }
    i = 1
    while(position.x-i >= 0 && grid[position.y][position.x].colour === grid[position.y][position.x-i].colour){
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
    board.score = res;;
}

function removeVerticalChainAt(grid,position){
    var count = 1
    var i = 1
    var waarde1 = 0
    var waarde2=0
    while(position.y-i >= 0 && grid[position.y][position.x].colour === grid[position.y-i][position.x].colour){
        i++
        grid[position.y-i+1][position.x] = new Gem("",false,false)
        waarde1++
    }
    if (waarde1>0){
        grid[position.y-i+1][position.x] = new Gem("",false,false)
    }
    i = 1
    while(position.y+i < grid.length && grid[position.y][position.x].colour === grid[position.y+i][position.x].colour){
        i++
        grid[position.y+i-1][position.x] = new Gem("",false,false)
        waarde2++
    }
     if (waarde2>0){
        grid[position.y+i-1][position.x] = new Gem("",false,false)
    }
    i = 1
    return grid
}

function removeHorizontalChainAt(grid,position){
    var count = 1
    var i = 1
    waarde1=0
    waarde2=0
    while( position.x+1 < grid[0].length &&grid[position.y][position.x].colour === grid[position.y][position.x+i].colour){
        i++
        grid[position.y][position.x+i-1] = new Gem("",false,false)
        waarde1++
    }
    if(waarde1>0){
        grid[position.y][position.x+i-1]= new Gem("",false,false)
    }
    i = 1
    while(position.y+1 < grid.length &&position.x-i >= 0 && grid[position.y][position.x].colour === grid[position.y][position.x-i].colour){
        i++
        grid[position.y][position.x-i+1] = new Gem("",false,false)
        waarde2++
    }
    if(waarde2>0){
        grid[position.y][position.x-i+1]= new Gem("",false,false)
    }
    return grid
}

function removeChains(grid)
{
    let l = 0
    let k =0
    let klaar1 = false
    let klaar2 = false
 
    klaar1=false
    while(!klaar1){
    for(let p = 0;p<grid.length;p++){
        let counter = verticalChainAt(grid,{x:l,y:p})
        if (counter>2){
            grid = removeVerticalChainAt(grid,{x:l,y:p})
        }
    }
        l=l+1
            if(l==grid[0].length){
                klaar1 = true
            }

    }

    l=0
    klaar2=false
    while(!klaar2){
        for(let u = 0;u<grid[0].length;u++){
            console.log("loop2 u: "+u+" l: "+l)
            let counter = horizontalChainAt(grid,{x:u,y:l})
            if (counter>2){
                grid = removeHorizontalChainAt(grid,{x:u,y:l})
            }
        }
                console.log("i am here")
        l++
        
            if(l==grid.length){
                klaar2 = true
            }
    }
    return grid
}