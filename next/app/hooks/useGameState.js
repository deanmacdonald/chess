"use client";

import { useState, useEffect, useCallback } from "react";

const API_URL = "http://localhost:3001/api/chess";

export default function useGameState() {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [moveList, setMoveList] = useState([]);

  // Load full game state from backend
  const loadState = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/state`);
      const data = await res.json();
      setState(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load game state:", err);
    }
  }, []);

  // Get legal moves for a square
  const getLegalMoves = useCallback(async (square) => {
    try {
      const res = await fetch(`${API_URL}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "legalMoves",
          from: square,
        }),
      });

      const data = await res.json();
      setValidMoves(data.legalMoves || []);
      return data.legalMoves || [];
    } catch (err) {
      console.error("Failed to get legal moves:", err);
      return [];
    }
  }, []);

  // Make a move
  const makeMove = useCallback(async (from, to) => {
    try {
      const res = await fetch(`${API_URL}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "move",
          from,
          to,
        }),
      });

      const data = await res.json();

      // Update move list
      setMoveList((prev) => [...prev, { from, to }]);

      // Update board state
      setState(data);

      // Clear selection + legal moves
      setSelectedSquare(null);
      setValidMoves([]);

      return data;
    } catch (err) {
      console.error("Failed to make move:", err);
    }
  }, []);

  // Select a square on the board
  const selectSquare = useCallback(
    async (square) => {
      setSelectedSquare(square);
      const moves = await getLegalMoves(square);
      setValidMoves(moves);
    },
    [getLegalMoves],
  );

  // Load initial state on mount
  useEffect(() => {
    loadState();
  }, [loadState]);

  return {
    state,
    loading,
    selectedSquare,
    validMoves,
    moveList,
    selectSquare,
    makeMove,
    reload: loadState,
  };
}
