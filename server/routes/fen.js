import { Chess } from 'chess.js'

const game = new Chess()

export default async function (fastify, opts) {
  fastify.get('/fen', async (request, reply) => {
    return { fen: game.fen() }
  })
}

export { game }
