const React = require('react')
const PropTypes = require('prop-types')

const SHARED_PROPS = {
  source: PropTypes.object.isRequired
}

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
  function PropsExtractedFrom({ source }) {
    const { props } = Object.entries(Component.propTypes)
      .reduce(extractProps, { source, props: {} })

    return <Component {...props} />
  }

  PropsExtractedFrom.displayName = `PropsExtractedFrom(${getDisplayName(Component)})`
  PropsExtractedFrom.propTypes = SHARED_PROPS

  return PropsExtractedFrom
}

module.exports = PropExtractor
