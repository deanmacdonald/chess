/**
 * Returns the move history from the game state.
 * Pure UI/data helper — no engine logic here.
 */
export default function useMoveList(state) {
  return {
    moves: state.moves || [],
  };
}
