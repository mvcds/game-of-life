const GAME_STATUSES = {
  IDLE: 'IDLE',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED'
}

function start() {
  this.status = GAME_STATUSES.RUNNING
}

function Game(data) {
  Object.assign(this, data, {
    start: start.bind(this)
  })
}

module.exports = Game

module.exports.GAME_STATUSES = GAME_STATUSES
