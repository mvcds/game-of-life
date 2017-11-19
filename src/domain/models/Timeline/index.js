const Generation = require('./Generation')

function addGeneration({ generations }, cells) {
  const generation = new Generation({ cells })

  generations.push(generation)
}

class Timeline {
  constructor({ board: { cells } }) {
    this.generations = []
    this.generation = 0

    addGeneration(this, cells)
  }

  get topGeneration() {
    return this.generations.length - 1
  }

  get isAtFirstGeneration() {
    return this.generation === 0
  }

  get isAtLastGeneration() {
    return this.generation === this.topGeneration
  }

  get timestamp() {
    return `${this.generation} / ${this.topGeneration}`
  }
}

module.exports = Timeline
