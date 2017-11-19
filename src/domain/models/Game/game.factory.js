const { Factory } = require('rosie')

const BoardFactory = require('../Board/board.factory')

const Game = require('./index')

const STEPS = [{}, {}, {}]
const ALL_DEAD = BoardFactory.AllDead()

const game = new Factory()
  .attr('step', 0)
  .attr('steps', STEPS)
  .attr('canGoNext', false)

function build(data, isInstance) {
  const fixture = game.build(data)

  return isInstance ? new Game(fixture) : fixture
}

function WithBoard(injection = {}, isInstance = true) {
  const { board = ALL_DEAD } = injection

  const data = Object.assign({}, injection, { board })

  return build(data, isInstance)
}

module.exports = {
  WithBoard
}
