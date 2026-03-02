import { useState } from "react";
import { getLegalMoves, runEngine } from "../lib/chess";

/**
 * Manages the full game state and connects to the chess engine.
 */
export default function useGameState(initialState) {
  const [state, setState] = useState(initialState);

  /**
   * Player makes a move.
   */
  function makeMove(move) {
    const legal = getLegalMoves(state);

    const isLegal = legal.some((m) => m.from === move.from && m.to === move.to);

    if (!isLegal) {
      console.warn("Illegal move attempted:", move);
      return false;
    }

    // Apply the move to the board
    const [fromR, fromC] = move.from.split("-").map(Number);
    const [toR, toC] = move.to.split("-").map(Number);

    const newBoard = state.board.map((row) => [...row]);
    newBoard[toR][toC] = newBoard[fromR][fromC];
    newBoard[fromR][fromC] = "";

    // Switch turn
    const newTurn = state.turn === "white" ? "black" : "white";

    setState({
      ...state,
      board: newBoard,
      turn: newTurn,
    });

    return true;
  }

  return {
    state,
    makeMove,
    legalMoves: getLegalMoves(state),
  };
}
