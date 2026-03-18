import fp from 'fastify-plugin'
import pkg from '../gameStore.cjs'

const { getState } = pkg

async function gamesRoutes(fastify, opts) {
  fastify.get('/games', async (req, reply) => {
    try {
      const state = getState()

      // If your gameStore returns { fen, history, turn, ... }
      if (typeof state === 'object') {
        return {
          status: 'ok',
          game: {
            fen: state.fen || null,
            history: state.history || [],
            turn: state.turn || null,
            check: state.check || false,
            checkmate: state.checkmate || false,
            stalemate: state.stalemate || false,
            raw: state
          }
        }
      }

      // Fallback if getState() returns a string
      return {
        status: 'ok',
        game: {
          fen: state,
          history: [],
          turn: null,
          check: false,
          checkmate: false,
          stalemate: false
        }
      }
    } catch (err) {
      fastify.log.error(err)
      reply.code(500)
      return { status: 'error', message: 'Failed to load game state' }
    }
  })
}

export default fp(gamesRoutes)
