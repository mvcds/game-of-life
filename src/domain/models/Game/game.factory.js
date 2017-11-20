const { Factory } = require('rosie')

const BoardFactory = require('../Board/board.factory')

const Game = require('./index')

const ALL_DEAD = BoardFactory.AllDead()

const game = new Factory()
  .attr('board', [])

function build(data, isInstance) {
  const fixture = game.build(data)

  return isInstance ? new Game(fixture) : fixture
}

function WithBoard(board = ALL_DEAD, injection = {}, isInstance = true) {
  const data = Object.assign({}, injection, { board })

  return build(data, isInstance)
}

module.exports = {
  WithBoard
}
