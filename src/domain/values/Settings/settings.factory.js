const { Factory } = require('rosie')

const Settings = require('./index')

const settings = new Factory()
  .attr('columns', 0)
  .attr('rows', 0)

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
