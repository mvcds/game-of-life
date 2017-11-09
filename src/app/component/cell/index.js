const React = require('react')
const bem = require('bem-classname')

const baseClass = bem.bind(null, 'cell')

require('./cell.styl')

function Cell({ isAlive }) {
  return (
    <button className={baseClass({ 'is-alive': isAlive })}>
      {isAlive ? 'A' : 'D'}
    </button>
  )
}

module.exports = Cell
