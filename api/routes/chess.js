const express = require('express');
const router = express.Router();
const game = require('../gameEngine'); // your chess logic

// GET: return full game state
router.get('/state', (req, res) => {
  res.json(game.getState());
});

// POST: handle chess actions
router.post('/action', (req, res) => {
  const body = req.body;

  if (body.type === "legalMoves") {
    return res.json({
      legalMoves: game.getLegalMoves(body.from)
    });
  }

  if (body.type === "move") {
    game.makeMove(body.from, body.to);
    return res.json(game.getState());
  }

  return res.status(400).json({ error: "Invalid request" });
});

module.exports = router;
