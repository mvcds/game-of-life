const React = require('react')
const { storiesOf } = require('@storybook/react')
const { withKnobs, number } = require('@storybook/addon-knobs')
const { action } = require('@storybook/addon-actions')

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

  const board = factory({ columns, rows })

  return (
    <Board {...board} onToggleCell={toggleCellHandler} />
  )
}

function fillWithBoard(factory) {
  const name = beautifyName(factory)

  this.stories.add(name, () => createBoard(factory))
}

const stories = storiesOf('Organisms / Board', module)
  .addDecorator(withKnobs)

Object.values(BoardFactory)
  .filter(excludByName)
  .forEach(fillWithBoard, { stories })
