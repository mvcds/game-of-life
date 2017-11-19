const Timeline = require('../Timeline')

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
    this.start = start.bind(this)
    this.timeline = new Timeline(data)
  }
}

module.exports = Game

module.exports.GAME_STATUSES = GAME_STATUSES
