const { Factory } = require('rosie')
const { random } = require('faker')

const SettingsFactory = require('Values/Settings/settings.factory')
const { DEFAULT_STATE } = require('Values/GameStatuses')
const CellFactory = require('Models/Cell/cell.factory')

const Game = require('./index')

const game = new Factory()
  .attr('settings', SettingsFactory.DefaultSettings)
  .attr('status', DEFAULT_STATE)

function createCell(cell, index) {
  const isAlive = this.aliveCells.includes(index)

  const create = isAlive ? CellFactory.LockedALive : CellFactory.LockedDead

  return create(index)
}

function createCells({ settings = SettingsFactory.DefaultSettings() }, ...aliveCells) {
  const cells = Array(settings.boardSize).fill(0)

  return {
    cells: cells.map(createCell, { aliveCells })
  }
}

function build(data, isInstance) {
  const fixture = game.build(data)

  return isInstance ? new Game(fixture) : fixture
}

function withCells(injection = {}, isInstance = true) {
  const cells = createCells(injection, ...this)

  const data = Object.assign({}, injection, cells)

  return build(data, isInstance)
}

const gameFunctions = {
  AllDead: withCells.bind([]),
  OneCellInMiddle: withCells.bind([12]),
  Tub: withCells.bind([7, 11, 13, 17]),
  Blinker: withCells.bind([11, 12, 13])
}

const randomFunctions = Object.values(gameFunctions)

function Random(injection = {}, isInstance = true) {
  const randomSettings = random.arrayElement(randomFunctions)

  return randomSettings(injection, isInstance)
}

module.exports = Object.assign({}, gameFunctions, {
  Random
})

