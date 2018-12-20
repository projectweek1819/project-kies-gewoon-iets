class Gem {
    constructor(colour, special, selected) {
        this.colour = colour
        this.special = special
        this.selected = selected
    }
}

class Board {
    constructor(sourcePos, targetPos, score) {
        this.sourcePos = sourcePos
        this.targetPos = targetPos
        this.score = score
    }
}