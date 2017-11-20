const { Factory } = require('rosie')

const BoardFactory = require('../Board/board.factory')

const Game = require('./index')

const ALL_DEAD = BoardFactory.AllDead()

const game = new Factory()
  .attr('generation', 0)
  .attr('board', [])

function build(data, isInstance) {
  const fixture = game.build(data)

  return isInstance ? new Game(fixture) : fixture
}

function WithBoard(board = ALL_DEAD, injection = {}, isInstance = true) {
  const data = Object.assign({}, injection, { board })

  return build(data, isInstance)
}

function WithGenerations(number = 0, injection = {}, isInstance = true) {
  const { board = ALL_DEAD } = injection

  const data = Object.assign({}, injection, { board })

  const gameAtGeneration = build(data, isInstance)

  gameAtGeneration.timeline.generations = Array(number).fill({})

  return gameAtGeneration
}

module.exports = {
  WithBoard,
  WithGenerations
}
