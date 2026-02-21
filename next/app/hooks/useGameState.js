import { useState } from "react";
import { runEngine, getLegalMoves } from "@lib/chess";

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

    // Apply the move + run engine
    const result = runEngine(state);
    setState(result.newState);

    return true;
  }

  return {
    state,
    makeMove,
    legalMoves: getLegalMoves(state),
  };
}
