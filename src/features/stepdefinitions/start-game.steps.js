const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

const BoardFactory = require('../../domain/models/Board/board.factory')
const GameFactory = require('../../domain/models/Game/game.factory')

Given('I draw an empty board', () => {
  const board = BoardFactory.AllDead()

  this.game = GameFactory.WithBoard(board)
})

When('I start the game', () => {
  this.game.start()
})

Then('the game status changes to {string}', (status) => {
  expect(this.game.status).to.equal(status)
})
