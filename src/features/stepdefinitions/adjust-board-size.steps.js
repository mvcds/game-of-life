const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

const SettingsFactory = require('Values/Settings/settings.factory')

Given('a {int} x {int} board', (columns, rows) => {
  this.settings = SettingsFactory.DefaultSettings({ columns, rows })
})

When('I use {string} on board', (fn) => {
  this.settings[fn]()
})

Then('the board gets {int} {string}', (size, key) => {
  expect(this.settings[key]).to.equal(size)
})
