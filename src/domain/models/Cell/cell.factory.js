const { Factory } = require('rosie')

const cell = new Factory()
  .attr('isAlive', false)
  .attr('isLocked', false)

function build(data) {
  const fixture = cell.build(data)

  return fixture
}

function LockedALive(index, injection = {}, isInstance = true) {
  const data = Object.assign({}, injection, {
    isAlive: true,
    isLocked: true,
    index
  })

  return build(data, isInstance)
}

function LockedDead(index, injection = {}, isInstance = true) {
  const data = Object.assign({}, injection, {
    isAlive: false,
    isLocked: true,
    index
  })

  return build(data, isInstance)
}

module.exports = {
  LockedALive,
  LockedDead
}
