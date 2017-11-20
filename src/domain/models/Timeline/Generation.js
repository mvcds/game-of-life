function isAlive(cell) {
  return cell.isAlive
}

class Generation {
  constructor({ cells }) {
    this.cells = cells.filter(isAlive)
  }

  get canGoNext() {
    return this.cells.some(isAlive)
  }

  //  eslint-disable-next-line class-methods-use-this
  next() {
    return new Generation({ cells: [] })
  }
}

module.exports = Generation
