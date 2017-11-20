const { Factory } = require('rosie')

const BoardFactory = require('../Board/board.factory')

const Timeline = require('./index')
const Generation = require('./Generation')

const timeline = new Factory()
  .attr('board', BoardFactory.AllDead())

const generation = new Factory()
  .attr('cells', [])

function build(data, isInstance) {
  const fixture = timeline.build(data)

  return isInstance ? new Timeline(fixture) : fixture
}

function buildGeneration(isInstance) {
  const fixture = generation.build()

  return isInstance ? new Generation(fixture) : fixture
}

function WithGenerations(number, injection = {}, isInstance = true) {
  const data = Object.assign({}, injection)

  const object = build(data, isInstance)

  for (let i = 1; i < number; i += 1) {
    const generationObject = buildGeneration(isInstance)

    object.generations.push(generationObject)
  }

  return object
}

module.exports = {
  WithGenerations
}
