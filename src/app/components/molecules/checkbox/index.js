const React = require('react')
const bem = require('bem-classname')
const PropTypes = require('prop-types')

require('./checkbox.styl')

const baseClass = bem.bind(null, 'checkbox')

function Checkbox({ isChecked, onChange, id }) {
  return (
    <input
      id={id}
      className={baseClass()}
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
    />
  )
}

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  id: PropTypes.string
}

Checkbox.defaultProps = {
  id: undefined
}

module.exports = Checkbox
