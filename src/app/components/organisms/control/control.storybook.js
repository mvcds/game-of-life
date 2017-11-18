const React = require('react')
const { storiesOf } = require('@storybook/react')
const { withKnobs, select } = require('@storybook/addon-knobs')
const { action } = require('@storybook/addon-actions')

const { GAME_STATUSES } = require('../../../../domain/models/Game')
const GameFactory = require('../../../../domain/models/Game/game.factory')

const Control = require('./index')

const methods = {
  playHandler: action('Playing'),
  pauseHandler: action('Pause'),
  stopHandler: action('Stop'),
  resumeHandler: action('Resume'),
  gotoFirst: action('Go to First'),
  gotoPrevious: action('Go to Previous'),
  gotoNext: action('Go to Next'),
  gotoLast: action('Go to Last')
}

const GENERATION = {
  RandomAtStep0: 'Zero',
  RandomAtLastStepWithFuture: 'Last with Future',
  RandomAtLastStepWithGameOver: 'Last with Game Over',
  RandomAtMiddleStep: 'Random but Zero nor Last'
}

storiesOf('Organisms / Control', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const status = select('Status', GAME_STATUSES, GAME_STATUSES.IDLE)

    const generation = status === GAME_STATUSES.PAUSED && select('Generation', GENERATION, 'RandomAtStep0')

    const game = GameFactory[generation || 'RandomAtStep0']()

    return (
      <Control status={status} {...methods} {...game} />
    )
  })
