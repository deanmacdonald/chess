import useGameState from "./useGameState";

export default function useBoardUI() {
  const { state, setState } = useGameState();

  const board = state.board || [];
  const mappedPieces = {};

  board.forEach((row, rowIndex) => {
    row.forEach((piece, colIndex) => {
      const key = `${rowIndex}-${colIndex}`;
      mappedPieces[key] = piece;
    });
  });

  function selectSquare(square) {
    setState({
      ...state,
      selectedSquare: square,
    });
  }

  return {
    board,
    mappedPieces,
    selectedSquare: state.selectedSquare,
    selectSquare,
  };
}
