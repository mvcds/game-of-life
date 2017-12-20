const React = require('react')
const bem = require('bem-classname')
const PropTypes = require('prop-types')

const Board = require('../board')
const Control = require('../control')

require('./game.styl')

const baseClass = bem.bind(null, 'game')

function Game(props) {
  const {
    settings: { columns, rows },
    cells,
    status,
    gameOver,
    timeline: { isAtFirstGeneration, isAtLastGeneration, timestamp }
  } = props

  const canGoNext = !isAtLastGeneration && !gameOver

  return (
    <section className={baseClass()}>
      <Control
        columns={columns}
        rows={rows}
        isAtFirstGeneration={isAtFirstGeneration}
        isAtLastGeneration={isAtLastGeneration}
        canGoNext={canGoNext}
        status={status}
        timestamp={timestamp}
      />
      <Board columns={columns} rows={rows} cells={cells} />
    </section>
  )
}

Game.propTypes = {
  settings: PropTypes.object.isRequired,
  cells: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  gameOver: PropTypes.string.isRequired,
  timeline: PropTypes.object.isRequired
}

module.exports = Game
