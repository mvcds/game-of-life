const Generation = require('./Generation')

//  TODO: check why 'apply' didn't work
function updateLastGeneration(timeline, generation) {
  timeline.currentGeneration = generation //  eslint-disable-line no-param-reassign
  timeline.lastGeneration = generation //  eslint-disable-line no-param-reassign
}

function changeCurrentGeneration(timeline, generation, number, settings) {
  //  eslint-disable-next-line no-param-reassign
  timeline.currentGeneration = generation

  return timeline.goToGeneration(number, settings)
}

function createNewGeneration(timeline, number, settings) {
  const { currentGeneration } = timeline

  currentGeneration.createNext(settings)

  const { next } = currentGeneration

  if (!next) return false

  updateLastGeneration(timeline, next)

  return timeline.goToGeneration(number, settings)
}

function moveToNext(timeline, number, settings) {
  const { next, gameOverReason } = timeline.currentGeneration

  if (gameOverReason) return false

  if (next) return changeCurrentGeneration(timeline, next, number, settings)

  return createNewGeneration(timeline, number, settings)
}

function moveToPrevious(timeline, number, settings) {
  const { previous } = timeline.currentGeneration

  if (!previous) return false

  return changeCurrentGeneration(timeline, previous, number, settings)
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

  goToGeneration(targetNumber, settings) {
    const { number } = this.currentGeneration

    if (number === targetNumber) return true

    const move = targetNumber > number ? moveToNext : moveToPrevious

    return move(this, targetNumber, settings)
  }
}

module.exports = Timeline
