const React = require('react')
const bem = require('bem-classname')

require('./button.styl')

const baseClass = bem.bind(null, 'button')

function button({ children, onClick, disabled }) {
  return (
    <button className={baseClass()} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

module.exports = button
