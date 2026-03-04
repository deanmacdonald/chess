import useGameState from "./useGameState";

export default function useChessEngine() {
  const { state, makeMove, legalMoves } = useGameState();

  function attemptMove(square, addMove) {
    const from = state.selectedSquare;
    const to = square;

    if (!from) return;

    const move = { from, to };

    const success = makeMove(move);

    if (success && addMove) {
      addMove(move);
    }
  }

  return {
    makeMove: attemptMove,
    legalMoves,
  };
}
