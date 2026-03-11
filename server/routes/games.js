import fp from 'fastify-plugin'

async function gamesRoutes(fastify, opts) {
  fastify.get('/games', async (req, reply) => {
    return { status: 'ok', message: 'Games route working' }
  })
}

export default fp(gamesRoutes)
