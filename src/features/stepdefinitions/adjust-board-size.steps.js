const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

const BoardFactory = require('../../domain/models/Board/board.factory')

Given('a {int} x {int} board', (columns, rows) => {
  this.board = BoardFactory.SimplestBoard({ columns, rows })
})

When('I use {string} on board', (fn) => {
  this.board[fn]()
})

Then('the board gets {int} {string}', (size, key) => {
  expect(this.board[key]).to.equal(size)
})
