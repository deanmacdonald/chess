import pkg from '../gameStore.cjs'
const { undoLast, getState } = pkg

export default async function (fastify, opts) {
  fastify.post('/undo', async (request, reply) => {
    try {
      const ok = undoLast()

      if (!ok) {
        return { error: 'Nothing to undo' }
      }

      const state = getState()

      // If your gameStore returns an object with fen
      if (typeof state === 'object' && state.fen) {
        return { fen: state.fen }
      }

      // If it returns a string
      if (typeof state === 'string') {
        return { fen: state }
      }

      // Fallback
      return { fen: JSON.stringify(state) }
    } catch (err) {
      fastify.log.error(err)
      reply.code(500)
      return { error: 'Failed to undo move' }
    }
  })
}
