const { Factory } = require('rosie')
const { random } = require('faker')

const BoardFactory = require('../Board/board.factory')

const Game = require('./index')

const STEPS = [{}, {}, {}, {}, {}]
const ALL_DEAD = BoardFactory.AllDead()

const game = new Factory()
  .attr('step', 0)
  .attr('steps', STEPS)
  .attr('isGameOver', false)

function build(data, isInstance) {
  const fixture = game.build(data)

  return isInstance ? new Game(fixture) : fixture
}

function RandomAtStep0(injection = {}, isInstance = true) {
  const data = Object.assign({}, injection, {
    step: 0
  })

  return build(data, isInstance)
}

function RandomAtLastStepWithFuture(injection = {}, isInstance = true) {
  const { steps = STEPS } = injection

  const data = Object.assign({}, injection, {
    step: steps.length - 1,
    isGameOver: false
  })

  return build(data, isInstance)
}

function RandomAtLastStepWithGameOver(injection = {}, isInstance = true) {
  const { steps = STEPS } = injection

  const data = Object.assign({}, injection, {
    step: steps.length - 1,
    isGameOver: true
  })

  return build(data, isInstance)
}

function RandomAtMiddleStep(injection = {}, isInstance = true) {
  const { steps = STEPS } = injection

  const range = { min: 1, max: steps.length - 2 }

  const data = Object.assign({}, injection, {
    step: random.number(range)
  })

  return build(data, isInstance)
}

function WithBoard(injection = {}, isInstance = true) {
  const { board = ALL_DEAD } = injection

  const data = Object.assign({}, injection, { board })

  return build(data, isInstance)
}

module.exports = {
  RandomAtStep0,
  RandomAtLastStepWithFuture,
  RandomAtLastStepWithGameOver,
  RandomAtMiddleStep,
  WithBoard
}
