"use client";

import { useCallback } from "react";

/**
 * useBoardUI
 * Handles UI-only logic for the chessboard:
 * - converting between board coords and algebraic squares
 * - selecting squares
 * - highlighting legal moves
 * - triggering backend moves
 */
export default function useBoardUI({
  state,
  selectedSquare,
  validMoves,
  selectSquare,
  makeMove
}) {
  // Convert board coordinates (row, col) → algebraic square ("e2")
  const toSquare = useCallback((row, col) => {
    const files = "abcdefgh";
    const file = files[col];
    const rank = 8 - row;
    return `${file}${rank}`;
  }, []);

  // Convert algebraic square ("e2") → board coordinates (row, col)
  const fromSquare = useCallback((square) => {
    const files = "abcdefgh";
    const file = square[0];
    const rank = parseInt(square[1], 10);

    const col = files.indexOf(file);
    const row = 8 - rank;

    return { row, col };
  }, []);

  // Check if a square is a legal move destination
  const isLegalTarget = useCallback(
    (row, col) => {
      const sq = toSquare(row, col);
      return validMoves.some((m) => m.to === sq);
    },
    [validMoves, toSquare]
  );

  // Handle clicking a square on the board
  const onSquareClick = useCallback(
    async (row, col) => {
      const sq = toSquare(row, col);

      // If a piece is already selected and this square is a legal move → make move
      if (selectedSquare && validMoves.some((m) => m.to === sq)) {
        await makeMove(selectedSquare, sq);
        return;
      }

      // Otherwise, select this square and fetch legal moves
      await selectSquare(sq);
    },
    [selectedSquare, validMoves, makeMove, selectSquare, toSquare]
  );

  return {
    toSquare,
    fromSquare,
    isLegalTarget,
    onSquareClick
  };
}
