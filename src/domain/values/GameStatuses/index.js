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

module.exports = {
  GAME_STATUSES,
  changeState,
  DEFAULT_STATE: GAME_STATUSES.IDLE
}
