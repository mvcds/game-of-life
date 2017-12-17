const EMPTY_BOARD = {
  isMatch: function isEmpty(generation) {
    return generation.isEmpty
  }
}
const STATIC_BOARD = {
  isMatch: function isStatic(generation) {
    const { previous } = generation

    return !previous || generation.isEqual(previous)
  }
}

const REASONS = {
  EMPTY_BOARD,
  STATIC_BOARD
}

function isMatch([, reason]) {
  return reason.isMatch(this.generation)
}

class GameOver {
  static getReason(generation) {
    const [reason] = Object.entries(REASONS)
      .find(isMatch, { generation })

    return reason
  }
}

module.exports = GameOver
