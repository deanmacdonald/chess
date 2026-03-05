import React, { useState } from "react";
import GameStateContext from "./GameStateContext";
import { getLegalMoves } from "../lib/chess";

const initialState = {
  board: [
    ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
    ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
    ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
  ],
  turn: "white",
  moves: [],
  selectedSquare: null,
};

export default function GameStateProvider({ children }) {
  const [state, setState] = useState(initialState);

  function makeMove(move) {
    const legal = getLegalMoves(state);
    const isLegal = legal.some((m) => m.from === move.from && m.to === move.to);
    if (!isLegal) return false;

    const [fromR, fromC] = move.from.split("-").map(Number);
    const [toR, toC] = move.to.split("-").map(Number);

    const newBoard = state.board.map((row) => [...row]);
    newBoard[toR][toC] = newBoard[fromR][fromC];
    newBoard[fromR][fromC] = "";

    const newTurn = state.turn === "white" ? "black" : "white";

    setState({
      ...state,
      board: newBoard,
      turn: newTurn,
      moves: [...state.moves, move],
      selectedSquare: null,
    });

    return true;
  }

  const value = {
    state,
    setState,
    makeMove,
    legalMoves: getLegalMoves(state),
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
}
