import Fastify from 'fastify'
import fenRoute from './routes/fen.js'
import moveRoute from './routes/move.js'

const fastify = Fastify({ logger: true })

// Root route — prevents 404 on GET /
fastify.get('/', async () => {
  return { status: 'ok', message: 'Chess backend is running' }
})

// Register API routes
fastify.register(fenRoute)
fastify.register(moveRoute)

// Start server
fastify
  .listen({ port: 3000, host: '0.0.0.0' })
  .then(() => {
    console.log('Backend running at http://localhost:3000')
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
