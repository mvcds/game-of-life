const React = require('react')
const { storiesOf } = require('@storybook/react')
const { withKnobs, select } = require('@storybook/addon-knobs')
const { action } = require('@storybook/addon-actions')

const { GAME_STATUSES } = require('Values/GameStatuses')
const SettingsFactory = require('Values/Settings/settings.factory')
const GameFactory = require('Models/Game/game.factory')

const Game = require('./index')

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
  removeColumn: action('Remove Column'),
  addRow: action('Add Row'),
  removeRow: action('Remove Row'),
  onToggleCell: action('Toogle Cell'),
  onToggleAutoplay: action('Toogle Autoplay')
}

const min = 5

storiesOf('Organisms / Game', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const status = select('Status', GAME_STATUSES, GAME_STATUSES.IDLE)

    const settings = SettingsFactory.DefaultSettings({ columns: min, rows: min })

    const game = GameFactory.Random({ settings, status })

    const { columns, rows } = settings
    const {
      cells,
      gameOver,
      timeline: { isAtFirstGeneration, isAtLastGeneration, timestamp }
    } = game

    const canGoNext = !isAtLastGeneration && !gameOver

    return (
      <Game
        {...methods}
        columns={columns}
        rows={rows}
        cells={cells}
        status={status}
        gameOver={gameOver}
        isAtFirstGeneration={isAtFirstGeneration}
        isAtLastGeneration={isAtLastGeneration}
        timestamp={timestamp}
        canGoNext={canGoNext}
      />
    )
  })
