function isAlive(cell) {
  return cell.isAlive
}

function getGameOverReason(generation) {
  if (generation.gameOver) return generation.gameOver

  if (!generation.cells.some(isAlive)) return 'EMPTY_BOARD'

  return null
}

function isDifferentCell(cell, index) {
  return cell !== this.cells[index]
}

function getNextState(cell, index, cells) {
  return cell.getNextState(cells, this.settings)
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

  createNext(settings) {
    const cells = this.cells.map(getNextState, { settings })

    const hasChanged = this.cells.some(isDifferentCell, { cells })

    if (hasChanged) return new Generation({ cells, previous: this })

    this.gameOver = 'STATIC_BOARD'

    return null
  }
}

module.exports = Generation
