const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

const GameFactory = require('../../domain/models/Game/game.factory')

Given('I draw a {string} game', (boardType) => {
  this.game = GameFactory[boardType]()
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

Then('the game is over with {string}', (expectedGameOver) => {
  const { gameOver } = this.game

  expect(gameOver).to.equal(expectedGameOver)
})
