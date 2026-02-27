import { useGameStore } from "../store/useGameStore";

export function useChess() {
  const game = useGameStore((s) => s.game);
  const movePiece = useGameStore((s) => s.movePiece);
  const resetGame = useGameStore((s) => s.resetGame);
  const getLegalMoves = useGameStore((s) => s.getLegalMoves);

  return {
    game,
    board: game.board,
    turn: game.turn,
    capturedWhite: game.capturedWhite,
    capturedBlack: game.capturedBlack,
    inCheck: game.inCheck,
    inCheckmate: game.inCheckmate,
    inStalemate: game.inStalemate,
    inDraw: game.inDraw,
    movePiece,
    resetGame,
    getLegalMoves,
  };
}
