const { Factory } = require('rosie')
const { random } = require('faker')

const SettingsFactory = require('Values/Settings/settings.factory')
const TimelineFactory = require('Models/Timeline/timeline.factory')
const { DEFAULT_STATE } = require('Values/GameStatuses')
const CellFactory = require('Models/Cell/cell.factory')

const Game = require('./index')

const game = new Factory()
  .attr('status', DEFAULT_STATE)
  .attr('timeline', TimelineFactory.NoCells)
  .attr('settings', SettingsFactory.DefaultSettings)

function createCell(cell, index) {
  const isAlive = this.aliveCells.includes(index)

  const create = isAlive ? CellFactory.LockedALive : CellFactory.LockedDead

  return create(index)
}

function createCells({ settings = SettingsFactory.DefaultSettings() }, ...aliveCells) {
  const cells = Array(settings.boardSize).fill(0)

  return cells.map(createCell, { aliveCells })
}

function build(data, isInstance) {
  const fixture = game.build(data)

  return isInstance ? new Game(fixture) : fixture
}

function withGenerationZero(injection = {}, isInstance = true) {
  const cells = createCells(injection, ...this)

  const timeline = TimelineFactory.WithGenerations(0, { cells })

  const data = Object.assign({}, injection, { timeline })

  return build(data, isInstance)
}

const gameFunctions = {
  AllDead: withGenerationZero.bind([]),
  OneCellInMiddle: withGenerationZero.bind([12]),
  Tub: withGenerationZero.bind([7, 11, 13, 17]),
  Blinker: withGenerationZero.bind([11, 12, 13])
}

const randomFunctions = Object.values(gameFunctions)

function Random(injection = {}, isInstance = true) {
  const randomSettings = random.arrayElement(randomFunctions)

  return randomSettings(injection, isInstance)
}

module.exports = Object.assign({}, gameFunctions, {
  Random
})

