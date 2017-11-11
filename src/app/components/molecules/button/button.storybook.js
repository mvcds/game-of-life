const React = require('react')
const { storiesOf } = require('@storybook/react')
const { withKnobs, text } = require('@storybook/addon-knobs')
const { action } = require('@storybook/addon-actions')

const Button = require('./index')

const talk = action('Some action')

storiesOf('Molecules / Button', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const content = text('Text', 'Click Me')

    return (
      <Button onClick={talk}>
        {content}
      </Button>
    )
  })
  .add('Two buttons', () => {
    return [
      <Button onClick={talk} key="first">First</Button>,
      <Button onClick={talk} key="second">Second</Button>
    ]
  })
  .add('Three buttons', () => {
    return [
      <Button onClick={talk} key="first">First</Button>,
      <Button onClick={talk} key="second">Second</Button>,
      <Button onClick={talk} key="third">Third</Button>
    ]
  })
