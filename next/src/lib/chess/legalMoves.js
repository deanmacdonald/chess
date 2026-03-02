/**
 * Very simple legal move generator.
 * Only prevents moving opponent pieces and stays inside board.
 * You can expand this later.
 */

export default function getLegalMoves(state) {
  const moves = [];
  const board = state.board;
  const turn = state.turn === "white" ? "w" : "b";

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];

      if (!piece) continue;
      if (!piece.startsWith(turn)) continue;

      // Simple pseudo-legal moves: piece can move 1 square in any direction
      const deltas = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ];

      for (const [dr, dc] of deltas) {
        const nr = r + dr;
        const nc = c + dc;

        if (nr < 0 || nr > 7 || nc < 0 || nc > 7) continue;

        const target = board[nr][nc];

        // Can't capture own piece
        if (target && target.startsWith(turn)) continue;

        moves.push({
          from: `${r}-${c}`,
          to: `${nr}-${nc}`,
        });
      }
    }
  }

  return moves;
}
