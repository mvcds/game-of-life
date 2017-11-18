const React = require('react')
const bem = require('bem-classname')
const PropTypes = require('prop-types')

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

function TimelineControls(props) {
  const { step, steps, isGameOver, status, gotoFirst, gotoPrevious, gotoNext, gotoLast } = props
  if (status !== GAME_STATUSES.PAUSED) return null

  const isAtFirstStep = step === 0
  const isAtLastStep = step === steps.length - 1

  return (
    <div className={baseClass('group')}>
      <Button onClick={gotoFirst} key="first" disabled={isAtFirstStep}>First</Button>
      <Button onClick={gotoPrevious} key="previous" disabled={isAtFirstStep}>Previous</Button>
      <Button onClick={gotoNext} key="next" disabled={isAtLastStep && isGameOver}>Next</Button>
      <Button onClick={gotoLast} key="last" disabled={isAtLastStep}>Last</Button>
    </div>
  )
}

function Control(props) {
  return (
    <section className={baseClass()}>
      <GameStateControls {...props} />
      <TimelineControls {...props} />
    </section>
  )
}

getGameButtons.propTypes = {
  status: PropTypes.string.isRequired,
  playHandler: PropTypes.func.isRequired,
  pauseHandler: PropTypes.func.isRequired,
  resumeHandler: PropTypes.func.isRequired,
  stopHandler: PropTypes.func.isRequired
}

TimelineControls.propTypes = {
  step: PropTypes.number.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  gotoFirst: PropTypes.func.isRequired,
  gotoPrevious: PropTypes.func.isRequired,
  gotoNext: PropTypes.func.isRequired,
  gotoLast: PropTypes.func.isRequired
}

Control.propTypes = Object.assign({}, GameStateControls.propTypes, TimelineControls.propTypes)

module.exports = Control