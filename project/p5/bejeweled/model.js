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

