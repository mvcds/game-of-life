function getRepeted({ previous }, newGeneration) {
  if (!previous || newGeneration.isEqual(previous)) return previous

  return getRepeted(previous, newGeneration)
}

function getGameOverReason(timeline) {
  const { lastGeneration, repetition } = timeline

  if (repetition) return 'REPEATED_BOARD'

  if (lastGeneration.isEmpty) return 'EMPTY_BOARD'

  if (lastGeneration.isFirst) return 'STATIC_BOARD'

  const repeated = getRepeted(lastGeneration, lastGeneration)

  if (!repeated) return null

  timeline.repeatAt(repeated)

  return null
}

module.exports = { getGameOverReason }
