const React = require('react')
const { storiesOf } = require('@storybook/react')
const { withKnobs, select, number, boolean } = require('@storybook/addon-knobs')
const { action } = require('@storybook/addon-actions')

const { GAME_STATUSES } = require('../../../../domain/models/Game')
const TimelineFactory = require('../../../../domain/models/Timeline/timeline.factory')

const Control = require('./index')

const methods = {
  playHandler: action('Playing'),
  pauseHandler: action('Pause'),
  stopHandler: action('Stop'),
  resumeHandler: action('Resume'),
  gotoFirst: action('Go to First'),
  gotoPrevious: action('Go to Previous'),
  gotoNext: action('Go to Next'),
  gotoLast: action('Go to Last'),
  addColumn: action('Add Column'),
  removeColum: action('Remove Column'),
  addRow: action('Add Row'),
  removeRow: action('Remove Row')
}

const timeline = TimelineFactory.WithGenerations(3)

const generationRange = {
  range: true,
  min: 0,
  max: timeline.lastGeneration.number,
  step: 1
}

const sizeRange = {
  range: true,
  min: 1,
  max: 3,
  step: 1
}

storiesOf('Organisms / Control', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const status = select('Status', GAME_STATUSES, GAME_STATUSES.IDLE)

    const isPaused = status === GAME_STATUSES.PAUSED
    const isIdle = status === GAME_STATUSES.IDLE

    const generation = isPaused ? number('Generation', 0, generationRange) : 0
    const columns = isIdle ? number('Columns', 0, sizeRange) : 0
    const rows = isIdle ? number('Rows', 0, sizeRange) : 0

    timeline.goToGeneration(generation)

    const { isAtFirstGeneration, isAtLastGeneration, timestamp } = timeline

    const canGoNext = (isPaused && isAtLastGeneration) ? boolean('Can go next?', false) : false

    return (
      <Control
        {...methods}
        status={status}
        canGoNext={canGoNext}
        isAtFirstGeneration={isAtFirstGeneration}
        isAtLastGeneration={isAtLastGeneration}
        timestamp={timestamp}
        columns={columns}
        rows={rows}
        limits={sizeRange}
      />
    )
  })
