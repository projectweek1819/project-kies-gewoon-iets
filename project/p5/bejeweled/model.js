function checkMove(grid, p, q) {
    // zien of deze move mag gebeuren
    swap(grid, p, q);
    let h = horizontalChainAt(grid, {x:p.x, y: q.y});
    let v = verticalChainAt(grid, {x:p.x, y: q.y});

    if(h < 3 && v < 3){
        swap(grid, q, p);
    }
}
