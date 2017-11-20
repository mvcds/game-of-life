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

storiesOf('Organisms / Board', module)
  .addDecorator(withKnobs)
  .add('All Dead', () => {
    const columns = number('columns', min, options)
    const rows = number('rows', min, options)

    const board = BoardFactory.AllDead({ columns, rows })

    return (
      <Board {...board} onToggleCell={toggleCellHandler} />
    )
  })
  .add('One Cell Alive', () => {
    const columns = number('columns', min, options)
    const rows = number('rows', min, options)

    const board = BoardFactory.OneCellInMiddle({ columns, rows })

    return (
      <Board {...board} onToggleCell={toggleCellHandler} />
    )
  })
