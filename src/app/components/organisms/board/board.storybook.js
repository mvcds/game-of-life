const React = require('react')
const { storiesOf } = require('@storybook/react')
const { withKnobs, number } = require('@storybook/addon-knobs')
const { action } = require('@storybook/addon-actions')

const GameFactory = require('../../../../domain/models/Game/game.factory')
const BoardFactory = require('../../../../domain/models/Board/board.factory')

const Board = require('./index')

const min = 5
const toggleCellHandler = action('Toggle the cell')

const options = {
  range: true,
  min,
  max: min * 2,
  step: 1
}

function excludByName({ name }) {
  return name !== 'Random'
}

function beautifyName({ name }) {
  return name.split(/(?=[A-Z])/).join(' ')
}

function createBoard(factory) {
  const columns = number('columns', min, options)
  const rows = number('rows', min, options)

  const board = BoardFactory.SimplestBoard({ columns, rows })

  const { cells } = factory({ board })

  return (
    <Board {...board} cells={cells} onToggleCell={toggleCellHandler} />
  )
}

function fillWithBoard(factory) {
  const name = beautifyName(factory)

  this.stories.add(name, () => createBoard(factory))
}

const stories = storiesOf('Organisms / Board', module)
  .addDecorator(withKnobs)

Object.values(GameFactory)
  .filter(excludByName)
  .forEach(fillWithBoard, { stories })
