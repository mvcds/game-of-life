const React = require('react')
const bem = require('bem-classname')

const Button = require('../../molecules/button')

const { GAME_STATUSES } = require('../../../../domain/models/Game')

require('./control.styl')

const baseClass = bem.bind(null, 'control')

function getGameButtons({ status, playHandler, pauseHandler, resumeHandler, stopHandler }) {
  if (status === GAME_STATUSES.IDLE) return <Button onClick={playHandler}>Play</Button>

  const button = status === GAME_STATUSES.PAUSED
    ? <Button onClick={resumeHandler} key="resume">Resume</Button>
    : <Button onClick={pauseHandler} key="pause">Pause</Button>

  return [
    button,
    <Button onClick={stopHandler} key="stop">Stop</Button>
  ]
}

function GameStateControls(props) {
  const buttons = getGameButtons(props)

  return (
    <div className={baseClass('group')}>
      {buttons}
    </div>
  )
}

function TimelineControls({ game, status, gotoFirst, gotoPrevious, gotoNext, gotoLast }) {
  if (status !== GAME_STATUSES.PAUSED) return null

  const isAtFirstStep = game.step === 0
  const isAtLastStep = game.step === game.steps.length - 1

  return (
    <div className={baseClass('group')}>
      <Button onClick={gotoFirst} key="first" disabled={isAtFirstStep}>First</Button>
      <Button onClick={gotoPrevious} key="previous" disabled={isAtFirstStep}>Previous</Button>
      <Button onClick={gotoNext} key="next" disabled={isAtLastStep && game.isGameOver}>Next</Button>
      <Button onClick={gotoLast} key="last" disabled={isAtLastStep}>Last</Button>
    </div>
  )
}

function control(props) {
  return (
    <section className={baseClass()}>
      <GameStateControls {...props} />
      <TimelineControls {...props} />
    </section>
  )
}

module.exports = control
