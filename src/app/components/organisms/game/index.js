const React = require('react')
const bem = require('bem-classname')

const PropExtractor = require('Atoms/propExtractor')

const Board = PropExtractor(require('Organisms/board'))
const Control = PropExtractor(require('Organisms/control'))

require('./game.styl')

const baseClass = bem.bind(null, 'game')

function Game(props) {
  return (
    <section className={baseClass()}>
      <Control source={props} />
      <Board source={props} />
    </section>
  )
}

module.exports = Game
