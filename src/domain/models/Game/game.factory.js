const { Factory } = require('rosie')
const { random } = require('faker')

const BoardFactory = require('../Board/board.factory')
const CellFactory = require('../Cell/cell.factory')

const Game = require('./index')

const game = new Factory()
  .attr('board', BoardFactory.SimplestBoard)
  .attr('cells', [])

function createCell(cell, index) {
  const isAlive = this.aliveCells.includes(index)

  const create = isAlive ? CellFactory.LockedALive : CellFactory.LockedDead

  return create(index)
}

function createCells({ board = BoardFactory.SimplestBoard() }, ...aliveCells) {
  const cells = Array(board.size).fill(0)

  return {
    cells: cells.map(createCell, { aliveCells })
  }
}

function build(data, isInstance) {
  const fixture = game.build(data)

  return isInstance ? new Game(fixture) : fixture
}

function AllDead(injection = {}, isInstance = true) {
  const cells = createCells(injection)

  const data = Object.assign({}, injection, cells)

  return build(data, isInstance)
}

function OneCellInMiddle(injection = {}, isInstance = true) {
  const cells = createCells(injection, 12)

  const data = Object.assign({}, injection, cells)

  return build(data, isInstance)
}

const gameFunctions = {
  AllDead,
  OneCellInMiddle
}

const randomFunctions = Object.values(gameFunctions)

function Random(injection = {}, isInstance = true) {
  const randomBoard = random.arrayElement(randomFunctions)

  return randomBoard(injection, isInstance)
}

module.exports = Object.assign({}, gameFunctions, {
  Random
})

