/**
 * Applies a move and returns a new state.
 * This engine does NOT make its own moves — it only updates the board
 * after the player makes a legal move.
 */

export default function runEngine(state) {
  const newBoard = state.board.map((row) => [...row]);

  // The UI passes a move into makeMove(), not runEngine().
  // runEngine just returns the updated state with turn switched.
  return {
    newState: {
      ...state,
      board: newBoard,
      turn: state.turn === "white" ? "black" : "white",
    },
  };
}
