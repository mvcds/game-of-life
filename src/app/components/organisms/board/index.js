const React = require('react')
const bem = require('bem-classname')
const PropTypes = require('prop-types')

const Cell = require('../../molecules/cell')

require('./board.styl')

const baseClass = bem.bind(null, 'board')

function BoardCell({ isAlive }, index) {
  return <Cell key={index} clickHandler={this.onToggleCell} isAlive={isAlive} />
}

function stylize(columns, rows) {
  return {
    'grid-template-columns': `repeat(${columns}, 24px)`,
    'grid-template-rows': `repeat(${rows}, 24px)`
  }
}

function Board({ columns, rows, cells, onToggleCell }) {
  const style = stylize(columns, rows)

  return (
    <section className={baseClass()} style={style}>
      {cells.map(BoardCell, { onToggleCell })}
    </section>
  )
}

BoardCell.propTypes = Cell.propTypes

Board.propTypes = {
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  cells: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleCell: PropTypes.func.isRequired
}

module.exports = Board
