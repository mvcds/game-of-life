const { DEFAULT_STATE, changeState } = require('Values/GameStatuses')

const defaultData = {
  status: DEFAULT_STATE,
  timeline: null,
  settings: null
}

class Game {
  constructor(data) {
    Object.assign(this, defaultData, data)

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
