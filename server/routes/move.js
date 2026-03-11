import { game } from './fen.js'

export default async function (fastify, opts) {
  fastify.post('/move', async (request, reply) => {
    const { from, to } = request.body

    const result = game.move({ from, to })

    if (!result) {
      return { error: 'Illegal move' }
    }

    return { fen: game.fen() }
  })
}
