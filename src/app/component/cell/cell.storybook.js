const React = require('react')
const { storiesOf } = require('@storybook/react')
const { withKnobs, boolean } = require('@storybook/addon-knobs')

const Cell = require('./index')

storiesOf('Cell', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const isAlive = boolean('isAlive?', false);

    return (
      <Cell isAlive={isAlive} />
    )
  })
