const React = require('react')
const bem = require('bem-classname')

const Cell = require('../../molecules/cell')

require('./board.styl')

const baseClass = bem.bind(null, 'board')

function render(cell, index) {
  return <Cell key={index} clickHandler={this.onToggleCell} />
}

function stylize(columns, rows) {
  return {
    'grid-template-columns': `repeat(${ columns }, 24px)`,
    'grid-template-rows': `repeat(${ rows }, 24px)`
  }
}

function board({ columns, rows, cells, onToggleCell }) {
  const style = stylize(columns, rows)

  return (
    <section className={baseClass()} style={style}>
      {cells.map(render, { onToggleCell })}
    </section>
  )
}

module.exports = board
