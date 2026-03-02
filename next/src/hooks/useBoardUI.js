/**
 * UI helpers for rendering the board.
 * Converts the 8×8 array into a flat map of "row-col" → "wP" strings.
 */
export default function useBoardUI(state) {
  const pieces = {};

  // state.board is a 2D array: board[row][col]
  state.board.forEach((row, rowIndex) => {
    row.forEach((piece, colIndex) => {
      const key = `${rowIndex}-${colIndex}`;
      pieces[key] = piece; // keep string format: "wP", "bK", or ""
    });
  });

  return {
    pieces,
  };
}
