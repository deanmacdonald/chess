/**
 * Returns all legal moves for the current game state.
 * This is a simplified placeholder — expand later.
 */
export function getLegalMoves(state) {
  const moves = [];

  for (const square in state.board) {
    const piece = state.board[square];
    if (!piece) continue;

    const isWhite = piece.startsWith("w");
    if (
      (isWhite && state.turn !== "white") ||
      (!isWhite && state.turn !== "black")
    ) {
      continue;
    }

    // Example: allow every piece to move forward one square
    const forward = getForwardSquare(square, state.turn);
    if (forward && !state.board[forward]) {
      moves.push({ from: square, to: forward });
    }
  }

  return moves;
}

function getForwardSquare(square, turn) {
  const file = square[0];
  const rank = parseInt(square[1], 10);

  const newRank = turn === "white" ? rank + 1 : rank - 1;
  if (newRank < 1 || newRank > 8) return null;

  return `${file}${newRank}`;
}
