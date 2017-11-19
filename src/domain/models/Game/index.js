const GAME_STATUSES = {
  IDLE: 'IDLE',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED'
}

function start() {
  this.status = GAME_STATUSES.RUNNING
}

class Game {
  constructor(data) {
    Object.assign(this, data)

    this.start = start.bind(this)
    this.generations = [{ canGoNext:false }, {}, {}]
  }

  get canGoNext() {
    return this.generations[this.generation].canGoNext
  }
}

module.exports = Game

module.exports.GAME_STATUSES = GAME_STATUSES
