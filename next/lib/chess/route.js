/**
 * Applies a move to the board and returns a NEW game state.
 */
export function applyMove(state, move) {
  const newState = structuredClone(state);

  // Move the piece
  newState.board[move.to] = newState.board[move.from];
  newState.board[move.from] = null;

  // Switch turns
  newState.turn = state.turn === "white" ? "black" : "white";

  // Track move history
  newState.moves.push(move);

  return newState;
}
