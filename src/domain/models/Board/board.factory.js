const { Factory } = require('rosie')
const { random } = require('faker')

const CellFactory = require('../Cell/cell.factory')

const MIN_SIZE = 5

const board = new Factory()
  .attr('columns', MIN_SIZE)
  .attr('rows', MIN_SIZE)
  .attr('cells', [])

function createCell(cell, index) {
  const isAlive = this.aliveCells.includes(index)

  const create = isAlive ? CellFactory.LockedALive : CellFactory.LockedDead

  return create(index)
}

function createCommonBoard(...aliveCells) {
  const columns = MIN_SIZE
  const rows = MIN_SIZE

  const cells = Array(columns * rows).fill(0)

  return {
    columns,
    rows,
    cells: cells.map(createCell, { aliveCells })
  }
}

function AllDead(injection = {}) {
  const commonBoard = createCommonBoard()

  const data = Object.assign({}, injection, commonBoard)

  return board.build(data)
}

function OneCellInMiddle(injection = {}) {
  const commonBoard = createCommonBoard(12)

  const data = Object.assign({}, injection, commonBoard)

  return board.build(data)
}

const boardFunctions = {
  AllDead,
  OneCellInMiddle
}

const randomFunctions = Object.values(boardFunctions)

function Random(injection = {}) {
  const randomBoard = random.arrayElement(randomFunctions)

  return randomBoard(injection)
}

module.exports = Object.assign({}, boardFunctions, {
  Random
})
