const Timeline = require('../Timeline')

const FSM = {
  IDLE: {
    START: 'RUNNING'
  },
  RUNNING: {
    PAUSE: 'PAUSED',
    STOP: 'IDLE'
  },
  PAUSED: {
    RESUME: 'RUNNING',
    STOP: 'IDLE'
  }
}

function createEnum(final, key) {
  return Object.assign({}, final, { [key]: key })
}

const GAME_STATUSES = Object.keys(FSM)
  .reduce(createEnum, {})

function changeState(action) {
  this.status = FSM[this.status][action]
}

class Game {
  constructor(data) {
    this.status = GAME_STATUSES.IDLE
    this.timeline = new Timeline(data)

    this.start = changeState.bind(this, 'START')
    this.pause = changeState.bind(this, 'PAUSE')
    this.stop = changeState.bind(this, 'STOP')
    this.resume = changeState.bind(this, 'RESUME')
  }

  goNext() {
    const { number } = this.timeline.currentGeneration

    return this.timeline.goToGeneration(number + 1)
  }
}

module.exports = Game

module.exports.GAME_STATUSES = GAME_STATUSES
