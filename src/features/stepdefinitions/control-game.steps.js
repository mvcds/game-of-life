const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

const BoardFactory = require('../../domain/models/Board/board.factory')
const GameFactory = require('../../domain/models/Game/game.factory')

Given('I draw a {string} board', (boardType) => {
  const board = BoardFactory[boardType]()

  this.game = GameFactory.WithBoard(board)
})

When('I {string} the game', (command) => {
  this.game[command]()
})

Then('the game status changes to {string}', (status) => {
  expect(this.game.status).to.equal(status)
})

Then('the game stops at {int}', (generation) => {
  while (this.game.goNext());

  const { number } = this.game.timeline.lastGeneration

  expect(number).to.equal(generation)
})
