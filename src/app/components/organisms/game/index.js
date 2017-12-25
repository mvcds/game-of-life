const React = require('react')
const bem = require('bem-classname')

const PropExtractor = require('../../atoms/propExtractor')

const Board = PropExtractor(require('../board'))
const Control = PropExtractor(require('../control'))

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
