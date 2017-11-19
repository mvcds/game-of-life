const React = require('react')
const { storiesOf } = require('@storybook/react')
const { withKnobs, select, number, boolean } = require('@storybook/addon-knobs')
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

const game = GameFactory.WithBoard()

const lastGeneration = game.steps.length - 1

const range = {
  range: true,
  min: 0,
  max: lastGeneration,
  step: 1
}

storiesOf('Organisms / Control', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const status = select('Status', GAME_STATUSES, GAME_STATUSES.IDLE)

    const isPaused = status === GAME_STATUSES.PAUSED

    game.step = isPaused ? number('Generation', 0, range) : game.step

    game.canGoNext = (isPaused && game.step === lastGeneration) && boolean('Can go next?', false)

    return (
      <Control status={status} {...methods} {...game} />
    )
  })
