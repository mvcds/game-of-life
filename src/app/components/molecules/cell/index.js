const React = require('react')
const bem = require('bem-classname')
const PropTypes = require('prop-types')

require('./cell.styl')

const baseClass = bem.bind(null, 'cell')

function Cell({ isAlive, clickHandler }) {
  return (
    <button className={baseClass({ 'is-alive': isAlive })} onClick={clickHandler}>
      {isAlive ? 'A' : 'D'}
    </button>
  )
}

Cell.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  isAlive: PropTypes.bool.isRequired
}

module.exports = Cell
