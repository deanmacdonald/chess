/**
 * UI helpers for rendering the board.
 * No engine logic here — just presentation helpers.
 */
export default function useBoardUI(state) {
  const squares = Object.keys(state.board);
  const pieces = state.board;

  return {
    squares,
    pieces,
  };
}
