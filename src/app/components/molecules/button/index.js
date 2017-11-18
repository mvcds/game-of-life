const React = require('react')
const bem = require('bem-classname')
const PropTypes = require('prop-types')

require('./button.styl')

const baseClass = bem.bind(null, 'button')

function Button({ children, onClick, disabled }) {
  return (
    <button className={baseClass()} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  disabled: false
}

module.exports = Button
