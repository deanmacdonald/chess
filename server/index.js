import Fastify from 'fastify'
import fenRoute from './routes/fen.js'
import moveRoute from './routes/move.js'
import undoRoute from './routes/undo.js'
import resetRoute from './routes/reset.js'

const fastify = Fastify({ logger: true })

fastify.get('/', async () => {
  return { status: 'ok', message: 'Chess backend is running' }
})

fastify.register(fenRoute)
fastify.register(moveRoute)
fastify.register(undoRoute)
fastify.register(resetRoute)

fastify
  .listen({ port: 3000, host: '0.0.0.0' })
  .then(() => {
    console.log('Backend running at http://localhost:3000')
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
