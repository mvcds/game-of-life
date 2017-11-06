const { configure } = require('@storybook/react')

const requires = require.context('../src/app', true, /storybook\.js$/)
const loadStories = () => requires.keys().forEach(requires)

configure(loadStories, module)
