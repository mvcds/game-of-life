const React = require('react')
const bem = require('bem-classname')

require('./cell.styl')

const baseClass = bem.bind(null, 'cell')

function Cell({ isAlive, clickHandler }) {
  return (
    <button className={baseClass({ 'is-alive': isAlive })} onClick={clickHandler}>
      {isAlive ? 'A' : 'D'}
    </button>
  )
}

module.exports = Cell
