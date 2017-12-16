const { Factory } = require('rosie')
const { random } = require('faker')

const CellFactory = require('../Cell/cell.factory')

const Board = require('./index')

const { MIN_SIZE } = Board

const board = new Factory()
  .attr('columns', MIN_SIZE)
  .attr('rows', MIN_SIZE)
  .attr('cells', [])

function createCell(cell, index) {
  const isAlive = this.aliveCells.includes(index)

  const create = isAlive ? CellFactory.LockedALive : CellFactory.LockedDead

  return create(index)
}

function createCommonBoard(injection, ...aliveCells) {
  const columns = injection.columns || MIN_SIZE
  const rows = injection.rows || MIN_SIZE

  const cells = Array(columns * rows).fill(0)

  return {
    columns,
    rows,
    cells: cells.map(createCell, { aliveCells })
  }
}

function build(data, isInstance) {
  const fixture = board.build(data)

  return isInstance ? new Board(fixture) : fixture
}

function AllDead(injection = {}, isInstance = true) {
  const commonBoard = createCommonBoard(injection)

  const data = Object.assign({}, injection, commonBoard)

  return build(data, isInstance)
}

function OneCellInMiddle(injection = {}, isInstance = true) {
  const commonBoard = createCommonBoard(injection, 12)

  const data = Object.assign({}, injection, commonBoard)

  return build(data, isInstance)
}

const boardFunctions = {
  AllDead,
  OneCellInMiddle
}

const randomFunctions = Object.values(boardFunctions)

function Random(injection = {}, isInstance = true) {
  const randomBoard = random.arrayElement(randomFunctions)

  return randomBoard(injection, isInstance)
}

module.exports = Object.assign({}, boardFunctions, {
  Random
})
