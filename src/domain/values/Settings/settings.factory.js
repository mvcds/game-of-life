const { Factory } = require('rosie')

const Settings = require('./index')

const { MIN_SIZE } = Settings

const settings = new Factory()
  .attr('columns', MIN_SIZE)
  .attr('rows', MIN_SIZE)

function build(data, isInstance) {
  const fixture = settings.build(data)

  return isInstance ? new Settings(fixture) : fixture
}

function DefaultSettings(injection = {}, isInstance = true) {
  return build(injection, isInstance)
}

module.exports = {
  DefaultSettings
}
