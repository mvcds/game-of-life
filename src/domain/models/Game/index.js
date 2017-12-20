const { DEFAULT_STATE, changeState } = require('../../values/GameStatuses')

const Timeline = require('../Timeline')

class Game {
  constructor(data) {
    this.status = data.status || DEFAULT_STATE
    this.timeline = new Timeline(data)
    this.settings = data.settings

    this.start = changeState.bind(this, 'START')
    this.pause = changeState.bind(this, 'PAUSE')
    this.stop = changeState.bind(this, 'STOP')
    this.resume = changeState.bind(this, 'RESUME')
  }

  get cells() {
    return this.timeline.currentGeneration.cells
  }

  get gameOver() {
    return this.timeline.gameOver
  }

  goNext() {
    const { number } = this.timeline.currentGeneration

    return this.timeline.goToGeneration(number + 1, this.settings)
  }
}

module.exports = Game
