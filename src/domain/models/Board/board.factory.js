const { Factory } = require('rosie')

const board = new Factory()
  .attr('columns', 0)
  .attr('rows', 0)
  .attr('cells', [])

function AllDead(injection = {}) {
  const { columns = 0, rows = 0 } = injection

  const data = Object.assign({}, injection, {
    columns,
    rows,
    cells: Array(columns * rows).fill(0)
  })

  return board.build(data)
}

module.exports = {
  AllDead
}
