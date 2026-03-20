import express from 'express'
import cors from 'cors'
import { Chess } from 'chess.js'

const app = express()
app.use(cors())

// Create a fresh chess game
const game = new Chess()

// Disable ALL caching
app.use((req, res, next) => {
  res.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  )
  res.set('Pragma', 'no-cache')
  res.set('Expires', '0')
  next()
})

// FEN endpoint
app.get('/fen', (req, res) => {
  res.json({ fen: game.fen() })
})

// Start server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})
