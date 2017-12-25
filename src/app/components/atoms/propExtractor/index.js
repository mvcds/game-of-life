const React = require('react')
const PropTypes = require('prop-types')

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component'
}

function extractProps(final, [key]) {
  const { source, props } = final

  const value = source[key]

  if (value === undefined) return final

  return {
    source,
    props: Object.assign({}, props, { [key]: value })
  }
}

function PropExtractor(Component) {
  const name = `PropExtractorOf(${getDisplayName(Component)})`

  class PropExtractorOf extends React.Component {
    constructor(props) {
      super(props)

      this.name = name
    }

    render() {
      const { source } = this.props

      const { props } = Object.entries(Component.propTypes)
        .reduce(extractProps, { source, props: {} })

      return <Component {...props} />
    }
  }

  PropExtractorOf.propTypes = {
    source: PropTypes.object.isRequired
  }

  return PropExtractorOf
}

module.exports = PropExtractor
