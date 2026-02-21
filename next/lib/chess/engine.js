import { getLegalMoves } from "@lib/chess/validate";
import { applyMove } from "@lib/chess/route";

/**
 * Runs the chess engine on the current game state.
 * Returns the best move and the updated state.
 */
export function runEngine(gameState) {
  const legalMoves = getLegalMoves(gameState);

  if (legalMoves.length === 0) {
    return {
      gameOver: true,
      reason: "No legal moves",
      bestMove: null,
      newState: gameState,
    };
  }

  // Simple evaluation: pick the first legal move
  const bestMove = legalMoves[0];
  const newState = applyMove(gameState, bestMove);

  return {
    gameOver: false,
    bestMove,
    newState,
  };
}
