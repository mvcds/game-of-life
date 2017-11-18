const { Factory } = require('rosie')
const { random } = require('faker')

const STEPS = [1, 2, 3, 4, 5]

const game = new Factory()
  .attr('step', 0)
  .attr('steps', STEPS)
  .attr('isGameOver', false)

function RandomAtStep0(injection = {}) {
  const data = Object.assign({}, injection, {
    step: 0
  })

  return game.build(data)
}

function RandomAtLastStepWithFuture(injection = {}) {
  const { steps = STEPS } = injection

  const data = Object.assign({}, injection, {
    step: steps.length - 1,
    isGameOver: false
  })

  return game.build(data)
}

function RandomAtLastStepWithGameOver(injection = {}) {
  const { steps = STEPS } = injection

  const data = Object.assign({}, injection, {
    step: steps.length - 1,
    isGameOver: true
  })

  return game.build(data)
}

function RandomAtMiddleStep(injection = {}) {
  const { steps = STEPS } = injection

  const range = { min: 1, max: steps.length - 2 }

  const data = Object.assign({}, injection, {
    step: random.number(range)
  })

  return game.build(data)
}

module.exports = {
  RandomAtStep0,
  RandomAtLastStepWithFuture,
  RandomAtLastStepWithGameOver,
  RandomAtMiddleStep
}
