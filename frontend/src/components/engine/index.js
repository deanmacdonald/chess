import { Chess } from 'chess.js'

export function getLegalMoves(fen, square) {
  const game = new Chess(fen)
  return game.moves({ square, verbose: true })
}

export function makeMove(fen, move) {
  const game = new Chess(fen)
  const result = game.move({ from: move.from, to: move.to })

  if (!result) return null // illegal move
  return game.fen()
}
