const { Factory } = require('rosie')

const Timeline = require('./index')
const Generation = require('./Generation')

const timeline = new Factory()

const generation = new Factory()
  .attr('cells', [])
  .attr('previous', null)

function build(data, isInstance) {
  const fixture = timeline.build(data)

  return isInstance ? new Timeline(fixture) : fixture
}

function buildGeneration(previous, isInstance) {
  const fixture = generation.build({ previous })

  return isInstance ? new Generation(fixture) : fixture
}

function WithGenerations(number, injection = {}, isInstance = true) {
  const data = Object.assign({}, injection)

  const object = build(data, isInstance)

  for (let i = 1; i < number; i += 1) {
    const current = object.lastGeneration

    const generationObject = buildGeneration(current, isInstance)

    current.next = generationObject
    object.lastGeneration = generationObject
  }

  return object
}

module.exports = {
  WithGenerations,
  NoCells: WithGenerations.bind(null, 0)
}
