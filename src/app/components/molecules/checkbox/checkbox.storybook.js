const React = require('react')
const { storiesOf } = require('@storybook/react')
const { withKnobs, boolean } = require('@storybook/addon-knobs')
const { action } = require('@storybook/addon-actions')

const Checkbox = require('./index')

const talk = action('I was clicked')

storiesOf('Molecules / Checkbox', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const isChecked = boolean('isChecked?', false)

    return (
      <Checkbox isChecked={isChecked} onChange={talk} />
    )
  })
