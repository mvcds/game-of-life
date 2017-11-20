const Generation = require('./Generation')

function createNewGeneration(timeline) {
  if (!timeline.current.canGoNext) return false

  const generation = timeline.current.next()

  timeline.generations.push(generation)

  return true
}

class Timeline {
  constructor({ board: { cells } }) {
    const generation = new Generation({ cells })

    this.generations = [generation]
    this.generation = 0

    this.next = this.next.bind(this)
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

  get current() {
    return this.generations[this.generation]
  }

  next() {
    if (this.isAtLastGeneration) createNewGeneration(this)

    this.generation += 1

    return true
  }
}

module.exports = Timeline
