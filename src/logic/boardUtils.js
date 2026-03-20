export function cloneBoard(board) {
  return board.map((row) => [...row])
}

export function inBounds(r, c) {
  return r >= 0 && r < 8 && c >= 0 && c < 8
}
