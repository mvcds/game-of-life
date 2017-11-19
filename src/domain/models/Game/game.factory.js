const { Factory } = require('rosie')

const BoardFactory = require('../Board/board.factory')

const Game = require('./index')

const ALL_DEAD = BoardFactory.AllDead()

const game = new Factory()
  .attr('generation', 0)
  .attr('generations', [])

function build(data, isInstance) {
  const fixture = game.build(data)

  return isInstance ? new Game(fixture) : fixture
}

function WithBoard(injection = {}, isInstance = true) {
  const { board = ALL_DEAD } = injection

  const data = Object.assign({}, injection, { board })

  return build(data, isInstance)
}

function WithGenerations(number = 0, injection = {}, isInstance = true) {
  const generations = Array(number).fill({})

  const data = Object.assign({}, injection, { generations })

  return build(data, isInstance)
}

module.exports = {
  WithBoard,
  WithGenerations
}
