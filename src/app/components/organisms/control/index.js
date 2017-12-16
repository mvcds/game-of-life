const React = require('react')
const bem = require('bem-classname')
const PropTypes = require('prop-types')

const Button = require('../../molecules/button')

const { GAME_STATUSES } = require('../../../../domain/models/Game')

require('./control.styl')

const baseClass = bem.bind(null, 'control')

function IdleControls({ playHandler }) {
  return <Button onClick={playHandler} key="play">Play</Button>
}

function RunningControls({ pauseHandler, stopHandler }) {
  return (
    <div className={baseClass('group')}>
      <Button onClick={pauseHandler} key="pause">Pause</Button>
      <Button onClick={stopHandler} key="stop">Stop</Button>
    </div>
  )
}

function PausedControls({ resumeHandler, stopHandler }) {
  return (
    <div className={baseClass('group')}>
      <Button onClick={resumeHandler} key="resume">Resume</Button>
      <Button onClick={stopHandler} key="stop">Stop</Button>
    </div>
  )
}

function getControlByState({ status }) {
  if (status === GAME_STATUSES.IDLE) return IdleControls

  if (status === GAME_STATUSES.RUNNING) return RunningControls

  return PausedControls
}

function TimelineControls(props) {
  if (props.status !== GAME_STATUSES.PAUSED) return null

  const {
    isAtFirstGeneration, isAtLastGeneration, canGoNext,
    gotoFirst, gotoPrevious, gotoNext, gotoLast
  } = props

  const isNextDisabled = isAtLastGeneration && !canGoNext

  return (
    <div className={baseClass('group')}>
      <Button onClick={gotoFirst} key="first" disabled={isAtFirstGeneration}>First</Button>
      <Button onClick={gotoPrevious} key="previous" disabled={isAtFirstGeneration}>Previous</Button>
      <Button onClick={gotoNext} key="next" disabled={isNextDisabled}>Next</Button>
      <Button onClick={gotoLast} key="last" disabled={isAtLastGeneration}>Last</Button>
    </div>
  )
}

function TimelineDisplay({ status, timestamp }) {
  if (status === GAME_STATUSES.IDLE) return null

  return (
    <div className={baseClass('group')}>
      {timestamp}
    </div>
  )
}

function Control(props) {
  const GameStateControls = getControlByState(props)

  return (
    <section className={baseClass()}>
      <GameStateControls {...props} />
      <TimelineControls {...props} />
      <TimelineDisplay {...props} />
    </section>
  )
}

IdleControls.propTypes = {
  playHandler: PropTypes.func.isRequired
}

RunningControls.propTypes = {
  pauseHandler: PropTypes.func.isRequired,
  stopHandler: PropTypes.func.isRequired
}

PausedControls.propTypes = {
  resumeHandler: PropTypes.func.isRequired,
  stopHandler: PropTypes.func.isRequired
}

TimelineControls.propTypes = {
  isAtFirstGeneration: PropTypes.bool.isRequired,
  isAtLastGeneration: PropTypes.bool.isRequired,
  canGoNext: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  gotoFirst: PropTypes.func.isRequired,
  gotoPrevious: PropTypes.func.isRequired,
  gotoNext: PropTypes.func.isRequired,
  gotoLast: PropTypes.func.isRequired
}

TimelineDisplay.propTypes = {
  status: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired
}

//  eslint-disable-next-line function-paren-newline
Control.propTypes = Object.assign({},
  TimelineControls.propTypes,
  IdleControls.propTypes,
  RunningControls.propTypes,
  PausedControls.propTypes
)

module.exports = Control
