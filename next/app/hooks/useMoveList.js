"use client";

import { useState, useCallback } from "react";

export default function useMoveList() {
  const [moves, setMoves] = useState([]);

  const addMove = useCallback((move) => {
    setMoves((prev) => [...prev, move]);
  }, []);

  const clearMoves = useCallback(() => {
    setMoves([]);
  }, []);

  return {
    moves,
    addMove,
    clearMoves,
  };
}
