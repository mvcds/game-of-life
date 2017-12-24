const React = require('react')
const { storiesOf } = require('@storybook/react')
const { withKnobs, select } = require('@storybook/addon-knobs')
const { action } = require('@storybook/addon-actions')

const { GAME_STATUSES } = require('../../../../domain/values/GameStatuses')
const SettingsFactory = require('../../../../domain/values/Settings/settings.factory')
const GameFactory = require('../../../../domain/models/Game/game.factory')

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
  removeColum: action('Remove Column'),
  addRow: action('Add Row'),
  removeRow: action('Remove Row'),
  onToggleCell: action('Toogle Cell')
}

const min = 5

storiesOf('Organisms / Game', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const status = select('Status', GAME_STATUSES, GAME_STATUSES.IDLE)

    const settings = SettingsFactory.DefaultSettings({ columns: min, rows: min })

    const game = GameFactory.Random({ settings, status })

    return (
      <Game {...game} {...methods} cells={game.cells} gameOver={game.gameOver} />
    )
  })
