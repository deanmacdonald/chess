// src/lib/chessEngine.js
import { Chess } from 'chess.js'

const game = new Chess()

export function getBoard() {
  return game.board()
}

export function move(from, to) {
  const result = game.move({ from, to, promotion: 'q' })
  return result
}

export function getFen() {
  return game.fen()
}

export function resetGame() {
  game.reset()
}

export function getLegalMoves(square) {
  return game.moves({ square, verbose: true })
}
