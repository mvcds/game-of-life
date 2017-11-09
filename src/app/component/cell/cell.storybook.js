const React = require('react')
const { storiesOf } = require('@storybook/react')
const { withKnobs, boolean } = require('@storybook/addon-knobs')
const { action } = require('@storybook/addon-actions')

const Cell = require('./index')

const talk = action('I was clicked')

storiesOf('Cell', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const isAlive = boolean('isAlive?', false);

    return (
      <Cell isAlive={isAlive} clickHandler={talk} />
    )
  })
