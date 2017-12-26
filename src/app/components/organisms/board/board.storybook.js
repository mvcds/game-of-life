const React = require('react')
const { storiesOf } = require('@storybook/react')
const { withKnobs, number } = require('@storybook/addon-knobs')
const { action } = require('@storybook/addon-actions')

const GameFactory = require('Models/Game/game.factory')
const SettingsFactory = require('Values/Settings/settings.factory')

const Board = require('./index')

const min = 5
const toggleCellHandler = action('Toggle the cell')

const options = {
  range: true,
  min,
  max: min * 2,
  step: 1
}

function excludByName([name]) {
  return name !== 'Random'
}

function beautifyName(name) {
  return name.split(/(?=[A-Z])/).join(' ')
}

function createSettings(factory) {
  const columns = number('columns', min, options)
  const rows = number('rows', min, options)

  const settings = SettingsFactory.DefaultSettings({ columns, rows })

  const { cells } = factory({ settings })

  return (
    <Board {...settings} cells={cells} onToggleCell={toggleCellHandler} />
  )
}

function fillWithSettings([key, factory]) {
  const name = beautifyName(key)

  this.stories.add(name, () => createSettings(factory))
}

const stories = storiesOf('Organisms / Board', module)
  .addDecorator(withKnobs)

Object.entries(GameFactory)
  .filter(excludByName)
  .forEach(fillWithSettings, { stories })
