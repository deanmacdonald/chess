// Simple chess engine wrapper using chess.js
const { Chess } = require('chess.js');

// Create a new game instance
const game = new Chess();

// Return full game state
function getState() {
  return {
    fen: game.fen(),
    turn: game.turn(),
    inCheck: game.in_check(),
    inCheckmate: game.in_checkmate(),
    inDraw: game.in_draw(),
    moves: game.moves({ verbose: true })
  };
}

// Return legal moves from a square
function getLegalMoves(from) {
  return game.moves({ square: from, verbose: true });
}

// Make a move
function makeMove(from, to) {
  const move = game.move({ from, to });

  if (!move) {
    return { error: "Illegal move" };
  }

  return getState();
}

module.exports = {
  getState,
  getLegalMoves,
  makeMove
};
