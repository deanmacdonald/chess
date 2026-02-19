"use client";

import { useState, useEffect } from "react";

/**
 * useMoveList
 * Syncs move history with backend chess state.
 *
 * Pass in the backend `state` object from useGameState or useChess.
 */
export default function useMoveList(state) {
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    if (!state) return;

    // chess.js returns verbose move objects in state.moves
    if (state.moves && Array.isArray(state.moves)) {
      setMoves(state.moves);
    }
  }, [state]);

  return {
    moves,
  };
}
