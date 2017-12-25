const React = require('react')
const bem = require('bem-classname')
const PropTypes = require('prop-types')

const PropExtractor = require('../../atoms/propExtractor')
const Button = require('../../molecules/button')

const { GAME_STATUSES } = require('../../../../domain/values/GameStatuses')
const { MIN_BOARD_SIZE, MAX_BOARD_SIZE } = require('../../../../domain/values/Settings')

require('./control.styl')

const BOARD_SIZE = { min: MIN_BOARD_SIZE, max: MAX_BOARD_SIZE }

const baseClass = bem.bind(null, 'control')

function PlayButton({ playHandler }) {
  return (
    <div className={baseClass('group')}>
      <Button onClick={playHandler} key="play">Play</Button>
    </div>
  )
}

function SizeAdjuster({ onAdd, onRemove, name, size, limits }) {
  const isAddDisabled = size >= limits.max
  const isRemoveDisabled = size <= limits.min

  return (
    <div className={baseClass('group')}>
      <Button onClick={onRemove} disabled={isRemoveDisabled}>{ name }-</Button>
      <Button onClick={onAdd} disabled={isAddDisabled}>{ name }+</Button>
    </div>
  )
}

function IdleControls(props) {
  const {
    playHandler, addColumn, removeColumn, addRow, removeRow,
    columns, rows, limits = BOARD_SIZE
  } = props

  return [
    <PlayButton playHandler={playHandler} key="play" />,
    <SizeAdjuster
      onAdd={addColumn}
      onRemove={removeColumn}
      name="Col."
      size={columns}
      limits={limits}
      key="columns"
    />,
    <SizeAdjuster
      onAdd={addRow}
      onRemove={removeRow}
      name="Rows"
      size={rows}
      limits={limits}
      key="rows"
    />
  ]
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

const ExtractedTimelineControls = PropExtractor(TimelineControls)
const ExtractedTimelineDisplay = PropExtractor(TimelineDisplay)
const ExtractedIdleControls = PropExtractor(IdleControls)
const ExtractedRunningControls = PropExtractor(RunningControls)
const ExtractedPausedControls = PropExtractor(PausedControls)

function getControlByState({ status }) {
  if (status === GAME_STATUSES.IDLE) return ExtractedIdleControls

  if (status === GAME_STATUSES.RUNNING) return ExtractedRunningControls

  return ExtractedPausedControls
}

function Control(props) {
  const GameStateControls = getControlByState(props)

  return (
    <section className={baseClass()}>
      <GameStateControls source={props} />
      <ExtractedTimelineControls source={props} />
      <ExtractedTimelineDisplay source={props} />
    </section>
  )
}

SizeAdjuster.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  limits: PropTypes.object.isRequired
}

PlayButton.propTypes = {
  playHandler: PropTypes.func.isRequired
}

IdleControls.propTypes = {
  playHandler: PropTypes.func.isRequired,
  addColumn: PropTypes.func.isRequired,
  removeColumn: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  limits: PropTypes.object
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
  IdleControls.propTypes,
  RunningControls.propTypes,
  PausedControls.propTypes,
  TimelineControls.propTypes,
  TimelineDisplay.propTypes
)

module.exports = Control
