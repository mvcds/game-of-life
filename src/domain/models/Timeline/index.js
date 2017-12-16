const Generation = require('./Generation')

//  TODO: check why 'apply' didn't work
function updateLastGeneration(timeline, generation) {
  timeline.currentGeneration = generation //  eslint-disable-line no-param-reassign
  timeline.lastGeneration = generation //  eslint-disable-line no-param-reassign
}

function update(timeline, generation, number) {
  //  eslint-disable-next-line no-param-reassign
  timeline.currentGeneration = generation

  return timeline.goToGeneration(number)
}

function createNewGeneration(timeline, number) {
  const newGeneration = timeline.currentGeneration.createNext()

  //  eslint-disable-next-line no-param-reassign
  timeline.currentGeneration.next = newGeneration

  updateLastGeneration(timeline, newGeneration)

  return timeline.goToGeneration(number)
}

function moveToNext(timeline, number) {
  const { next, gameOverReason } = timeline.currentGeneration

  if (gameOverReason) return false

  if (next) return update(timeline, next, number)

  return createNewGeneration(timeline, number)
}

function moveToPrevious(timeline, number) {
  const { previous } = timeline.currentGeneration

  if (!previous) return false

  return update(timeline, previous, number)
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

  goToGeneration(targetNumber) {
    const { number } = this.currentGeneration

    if (number === targetNumber) return true

    const move = targetNumber > number ? moveToNext : moveToPrevious

    return move(this, targetNumber)
  }
}

module.exports = Timeline
