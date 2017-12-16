const Generation = require('./Generation')

//  TODO: check why 'apply' didn't work
function updateLastGeneration(timeline, generation) {
  timeline.currentGeneration = generation //  eslint-disable-line no-param-reassign
  timeline.lastGeneration = generation //  eslint-disable-line no-param-reassign
}

class Timeline {
  constructor({ cells }) {
    const generation = new Generation({ cells })

    this.goToGeneration = this.goToGeneration.bind(this)

    updateLastGeneration(this, generation)
  }

  get isAtFirstGeneration() {
    return this.currentGeneration.isFirst
  }

  get isAtLastGeneration() {
    return this.currentGeneration.isLast
  }

  get timestamp() {
    return `${this.currentGeneration.number} / ${this.lastGeneration.number}`
  }

  goToGeneration(number) {
    const { number: current, previous, next, gameOverReason } = this.currentGeneration

    if (current === number) return true

    const isMovingToNext = number > current

    const generation = isMovingToNext ? next : previous

    if (generation) {
      this.currentGeneration = generation

      return this.goToGeneration(number)
    }

    if (!isMovingToNext || gameOverReason) return false

    const newGeneration = this.currentGeneration.createNext()

    this.currentGeneration.next = newGeneration

    updateLastGeneration(this, newGeneration)

    return this.goToGeneration(number)
  }
}

module.exports = Timeline
