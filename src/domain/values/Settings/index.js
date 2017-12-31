const MIN_BOARD_SIZE = 5
const MAX_BOARD_SIZE = MIN_BOARD_SIZE ** 2

function limitSize(value = MIN_BOARD_SIZE) {
  return Math.min(Math.max(value, MIN_BOARD_SIZE), MAX_BOARD_SIZE)
}

function adjustSize(key, increment) {
  this[key] = limitSize(this[key] + increment)
}

class Settings {
  constructor(data) {
    const { columns, rows } = data

    this.columns = limitSize(columns)
    this.rows = limitSize(rows)

    this.addColumn = adjustSize.bind(this, 'columns', 1)
    this.removeColumn = adjustSize.bind(this, 'columns', -1)
    this.addRow = adjustSize.bind(this, 'rows', 1)
    this.removeRow = adjustSize.bind(this, 'rows', -1)
  }

  get boardSize() {
    return this.columns * this.rows
  }
}

module.exports = Settings
