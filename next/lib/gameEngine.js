import { getLegalMoves } from "@lib/chess/moves";
import { applyMove } from "@lib/chess/board";
import { evaluatePosition } from "@lib/chess/eval";

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

  // Simple evaluation: pick the move with the highest score
  let bestMove = null;
  let bestScore = -Infinity;

  for (const move of legalMoves) {
    const simulated = applyMove(gameState, move);
    const score = evaluatePosition(simulated);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  const newState = applyMove(gameState, bestMove);

  return {
    gameOver: false,
    bestMove,
    newState,
  };
}
