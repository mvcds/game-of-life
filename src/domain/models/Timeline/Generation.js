function getNextState(cell, index, cells) {
  return cell.getNextState(cells, this.settings)
}

function isEqualCell(cell, index) {
  const other = this.cells[index]

  if (cell === other) return true

  return cell.index === other.index
    && cell.isAlive === other.isAlive
}

function isDead({ isAlive }) {
  return !isAlive
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

  get isEmpty() {
    return this.cells.every(isDead)
  }

  createNext(settings) {
    const cells = this.cells.map(getNextState, { settings })

    const next = new Generation({ cells, previous: this })

    if (!this.isEqual(next)) this.next = next
  }

  isEqual({ cells }) {
    return this.cells.every(isEqualCell, { cells })
  }
}

module.exports = Generation
