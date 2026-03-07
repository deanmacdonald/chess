const { Chess } = require("chess.js");

function createGameFromMoves(moves) {
  const chess = new Chess();
  for (const m of moves) {
    const res = chess.move({
      from: m.from_square,
      to: m.to_square,
      promotion: "q"
    });
    if (!res) {
      throw new Error("Illegal move in history");
    }
  }
  return chess;
}

module.exports = { createGameFromMoves };
