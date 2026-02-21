import { pieceValues } from "@lib/chess/pieces";

/**
 * Simple evaluation: sum of piece values.
 * Positive = good for white
 * Negative = good for black
 */
export function evaluatePosition(state) {
  let score = 0;

  for (const square in state.board) {
    const piece = state.board[square];
    if (!piece) continue;
    score += pieceValues[piece] || 0;
  }

  return score;
}
