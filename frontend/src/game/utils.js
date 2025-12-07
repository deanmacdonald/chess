// utils.js

// Check if coordinates are inside the board
export function inBounds(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

// Convert board coordinates to algebraic notation (e.g., [6,4] -> "e2")
export function toAlgebraic([row, col]) {
  const files = ['a','b','c','d','e','f','g','h'];
  return files[col] + (8 - row);
}

// Deep clone board (safe copy)
export function cloneBoard(board) {
  return board.map(row => row.map(cell => cell ? { ...cell } : null));
}

