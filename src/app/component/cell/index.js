const React = require('react')

function Cell({ isAlive }) {
  return (
    <button>{isAlive ? 'A' : 'D'}</button>
  )
}

module.exports = Cell
