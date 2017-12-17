const defaultData = {
  isAlive: false,
  isLocked: true,
  index: -1
}

function clone({ index }, isAlive) {
  //  eslint-disable-next-line no-use-before-define
  return new Cell({ isAlive, index, isLocked: true })
}

const UNDERPOPULATION = {
  isMatch: function isKilledByUnderpopulation({ isAlive }, neighbors) {
    return isAlive && neighbors < 2
  },
  execute: function killByUnderpopulation(cell) {
    return clone(cell, false)
  }
}

const OVERPOPULATION = {
  isMatch: function isKilledByOverpopulation({ isAlive }, neighbors) {
    return isAlive && neighbors > 3
  },
  execute: function killByOverpopulation(cell) {
    return clone(cell, false)
  }
}

const REPRODUCTION = {
  isMatch: function isReproducted({ isAlive }, neighbors) {
    return !isAlive && neighbors === 3
  },
  execute: function reproduce(cell) {
    return clone(cell, true)
  }
}

const KEEP = {
  isMatch: function isKeep() {
    return true
  },
  execute: function keepCell(cell) {
    return cell
  }
}

const CONSEQUENCES = {
  UNDERPOPULATION,
  OVERPOPULATION,
  REPRODUCTION,
  KEEP
}

function isMatch(consequence) {
  return consequence.isMatch(this.cell, this.neighbors)
}

function isAliveNeighbor({ isAlive, index }) {
  if (!isAlive) return false

  const { columns } = this.settings
  const diff = Math.abs(index - this.cell.index)

  return diff === 1
    || diff === columns - 1
    || diff === columns
    || diff === columns + 1
}

function countLivingNeighbors(cell, board, settings) {
  return board.filter(isAliveNeighbor, { cell, settings })
    .length
}

class Cell {
  constructor(data) {
    Object.assign(this, defaultData, data)
  }

  getNextState(cells, settings) {
    const neighbors = countLivingNeighbors(this, cells, settings)

    const consequence = Object.values(CONSEQUENCES)
      .find(isMatch, { cell: this, neighbors })

    return consequence.execute(this)
  }
}

module.exports = Cell
