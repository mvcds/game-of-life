const React = require('react')
const PropTypes = require('prop-types')
const { storiesOf } = require('@storybook/react')
const { withKnobs, text } = require('@storybook/addon-knobs')

const PropExtractor = require('./index')

function ReversedMessage({ message }) {
  return message.split('').reverse().join('')
}

ReversedMessage.propTypes = {
  message: PropTypes.string.isRequired
}

const ExtractedReversedMessage = PropExtractor(ReversedMessage)

storiesOf('Atoms / PropExtractor', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const message = text('text', 'I am a reversed message!')

    const source = { message }

    return (
      <ExtractedReversedMessage source={source} />
    )
  })
