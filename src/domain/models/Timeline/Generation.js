function isAlive(cell) {
  return cell.isAlive
}

function getGameOverReason(generation) {
  if (generation.gameOver) return generation.gameOver

  if (!generation.cells.some(isAlive)) return 'EMPTY_BOARD'

  return null
}

class Generation {
  constructor({ cells, previous }) {
    this.cells = cells
    this.previous = previous
    this.next = null

    this.number = previous ? previous.number + 1 : 0
  }

  get isFirst() {
    return !this.previous
  }

  get isLast() {
    return !this.next
  }

  get gameOverReason() {
    this.gameOver = getGameOverReason(this)

    return this.gameOver
  }

  createNext() {
    return new Generation({ cells: [], previous: this })
  }
}

module.exports = Generation
