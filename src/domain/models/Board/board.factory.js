const { Factory } = require('rosie')

const Board = require('./index')

const { MIN_SIZE } = Board

const board = new Factory()
  .attr('columns', MIN_SIZE)
  .attr('rows', MIN_SIZE)

function build(data, isInstance) {
  const fixture = board.build(data)

  return isInstance ? new Board(fixture) : fixture
}

function SimplestBoard(injection = {}, isInstance = true) {
  return build(injection, isInstance)
}

module.exports = {
  SimplestBoard
}
