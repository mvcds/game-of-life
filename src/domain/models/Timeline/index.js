const Generation = require('./Generation')

function updateLastGeneration(generation) {
  this.currentGeneration = generation
  this.lastGeneration = generation
}

function changeCurrentGeneration(number, settings, generation) {
  this.currentGeneration = generation

  return this.goToGeneration(number, settings)
}

function createNewGeneration(number, settings) {
  const { currentGeneration } = this

  currentGeneration.createNext(settings)

  const { next } = currentGeneration

  if (!next) return false

  updateLastGeneration.call(this, next)

  return this.goToGeneration(number, settings)
}

function moveToNext(number, settings) {
  const { next, gameOverReason } = this.currentGeneration

  if (gameOverReason) return false

  const move = next ? changeCurrentGeneration : createNewGeneration

  return move.call(this, number, settings, next)
}

function moveToPrevious(number, settings) {
  const { previous } = this.currentGeneration

  if (!previous) return false

  return changeCurrentGeneration.call(this, number, settings, previous)
}

class Timeline {
  constructor({ cells }) {
    const generation = new Generation({ cells })

    this.goToGeneration = this.goToGeneration.bind(this)

    updateLastGeneration.call(this, generation)
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

  goToGeneration(targetNumber, settings) {
    const { number } = this.currentGeneration

    if (number === targetNumber) return true

    const move = targetNumber > number ? moveToNext : moveToPrevious

    return move.call(this, targetNumber, settings)
  }
}

module.exports = Timeline
