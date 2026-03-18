import pkg from '../gameStore.cjs'
const { getState } = pkg

export default async function (fastify, opts) {
  fastify.get('/fen', async () => {
    try {
      const state = getState()

      // If your gameStore returns { fen: "...", ... }
      if (typeof state === 'object' && state.fen) {
        return state.fen
      }

      // If it already returns a string, just return it
      if (typeof state === 'string') {
        return state
      }

      // Fallback: stringify anything unexpected
      return JSON.stringify(state)
    } catch (err) {
      fastify.log.error(err)
      return 'error'
    }
  })
}
