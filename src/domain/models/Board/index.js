const MIN_BOARD_SIZE = 5
const MAX_BOARD_SIZE = MIN_BOARD_SIZE ** 2

function limitSize(value = 0) {
  return Math.min(Math.max(value, MIN_BOARD_SIZE), MAX_BOARD_SIZE)
}

function adjustSize(key, increment) {
  this[key] = limitSize(this[key] + increment)
}

class Board {
  static get MIN_SIZE() { return MIN_BOARD_SIZE }

  static get MAX_SIZE() { return MAX_BOARD_SIZE }

  constructor(data) {
    const { columns, rows, cells } = data

    this.columns = limitSize(columns)
    this.rows = limitSize(rows)
    this.cells = cells || []

    this.addColumn = adjustSize.bind(this, 'columns', 1)
    this.removeColumn = adjustSize.bind(this, 'columns', -1)
    this.addRow = adjustSize.bind(this, 'rows', 1)
    this.removeRow = adjustSize.bind(this, 'rows', -1)
  }
}

module.exports = Board
