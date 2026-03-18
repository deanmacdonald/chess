import pkg from '../gameStore.cjs'
const { applyMove, pushHistory, getState } = pkg

export default async function (fastify, opts) {
  fastify.post('/move', async (request, reply) => {
    const { from, to } = request.body

    // Basic validation
    if (!from || !to || typeof from !== 'string' || typeof to !== 'string') {
      reply.code(400)
      return { error: 'Invalid move format' }
    }

    // Build move string like "e2e4"
    const move = `${from}${to}`

    // Try applying the move WITHOUT modifying history yet
    const result = applyMove(move)

    if (!result) {
      return { error: 'Illegal move' }
    }

    // Move was legal → now save history
    pushHistory()

    // Return only the FEN string
    const state = getState()
    if (typeof state === 'object' && state.fen) {
      return { fen: state.fen }
    }

    return state
  })
}
