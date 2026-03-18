const { Chess } = require('chess.js')

let game = new Chess()
let history = [] // store previous FENs for undo

function getFEN() {
  return game.fen()
}

function setFEN(fen) {
  game = new Chess(fen)
}

function applyMove(from, to) {
  const move = game.move({ from, to })
  return move
}

function pushHistory() {
  history.push(game.fen())
}

function undoLast() {
  if (history.length === 0) return false
  const prevFen = history.pop()
  game = new Chess(prevFen)
  return true
}

function resetGame() {
  game = new Chess()
  history = []
}

function getState() {
  return {
    fen: game.fen(),
    turn: game.turn(),
    inCheck: game.inCheck ? game.inCheck() : game.in_check?.(),
    gameOver: game.isGameOver ? game.isGameOver() : game.is_game_over?.(),
    checkmate: game.isCheckmate ? game.isCheckmate() : game.is_checkmate?.(),
    draw: game.isDraw ? game.isDraw() : game.is_draw?.()
  }
}

module.exports = {
  getFEN,
  setFEN,
  applyMove,
  pushHistory,
  undoLast,
  resetGame,
  getState
}
