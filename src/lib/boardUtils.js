// src/lib/boardUtils.js
export function squareColor(row, col) {
  return (row + col) % 2 === 0 ? 'light' : 'dark'
}

export function algebraic(row, col) {
  const files = 'abcdefgh'
  return files[col] + (8 - row)
}
