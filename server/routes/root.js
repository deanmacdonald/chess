export default async function rootRoutes(fastify, opts) {
  fastify.get('/', async (req, reply) => {
    return { status: 'ok', message: 'Chess API root route working' }
  })
}
