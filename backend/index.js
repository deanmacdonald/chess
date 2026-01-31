const express = require('express');
const cors = require('cors');
const { Chess } = require('chess.js');

const app = express();
const port = 3000;

// In-memory single game instance
let game = new Chess();

app.use(cors());
app.use(express.json());

// Helpers
function getGameState() {
  return {
    fen: game.fen(),
    turn: game.turn(), // 'w' or 'b'
    gameOver: game.isGameOver(),
    inCheck: game.inCheck(),
    checkmate: game.isCheckmate(),
    stalemate: game.isStalemate(),
    insufficientMaterial: game.isInsufficientMaterial(),
    threefoldRepetition: game.isThreefoldRepetition(),
    draw: game.isDraw(),
    history: game.history({ verbose: true }),
  };
}

// Health
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: '♟️ Chess backend is running',
  });
});

// Get full game state
app.get('/api/state', (req, res) => {
  res.json(getGameState());
});

// Start a new game
app.post('/api/new', (req, res) => {
  game = new Chess();
  res.json({
    status: 'ok',
    message: 'New game started',
    state: getGameState(),
  });
});

// Reset game (alias of /api/new)
app.post('/api/reset', (req, res) => {
  game = new Chess();
  res.json({
    status: 'ok',
    message: 'Game reset',
    state: getGameState(),
  });
});

// Get legal moves from a square, e.g. /api/legal-moves?from=e2
app.get('/api/legal-moves', (req, res) => {
  const { from } = req.query;
  if (!from) {
    return res.status(400).json({ error: 'Missing "from" query param, e.g. ?from=e2' });
  }

  const moves = game.moves({ square: from, verbose: true });
  res.json({
    from,
    moves: moves.map((m) => ({
      from: m.from,
      to: m.to,
      san: m.san,
      promotion: m.promotion || null,
    })),
  });
});

// Make a move: { from: "e2", to: "e4", promotion?: "q" }
app.post('/api/move', (req, res) => {
  const { from, to, promotion } = req.body;

  if (!from || !to) {
    return res.status(400).json({ error: 'Missing "from" or "to" in body' });
  }

  const move = game.move({ from, to, promotion });

  if (!move) {
    return res.status(400).json({
      status: 'illegal',
      error: 'Illegal move',
      from,
      to,
      promotion: promotion || null,
    });
  }

  res.json({
    status: 'ok',
    move: {
      from: move.from,
      to: move.to,
      san: move.san,
      promotion: move.promotion || null,
    },
    state: getGameState(),
  });
});

app.listen(port, () => {
  console.log(`✅ Backend listening at http://localhost:${port}`);
});

