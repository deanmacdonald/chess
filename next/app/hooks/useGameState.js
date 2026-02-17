"use client";

import { useState, useCallback } from "react";

export default function useGameState() {
  // Full starting chess position
  const [board, setBoard] = useState(() => [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ]);

  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [moveList, setMoveList] = useState([]);

  const selectSquare = useCallback((row, col) => {
    const square = `${row}-${col}`;
    setSelectedSquare(square);
    setValidMoves([]); // placeholder
  }, []);

  const makeMove = useCallback((from, to) => {
    setMoveList((prev) => [...prev, { from, to }]);

    setBoard((prev) => {
      const newBoard = prev.map((row) => [...row]);
      const [fromRow, fromCol] = from.split("-").map(Number);
      const [toRow, toCol] = to.split("-").map(Number);

      newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
      newBoard[fromRow][fromCol] = null;

      return newBoard;
    });
  }, []);

  return {
    board,
    selectedSquare,
    validMoves,
    moveList,
    selectSquare,
    makeMove,
  };
}
