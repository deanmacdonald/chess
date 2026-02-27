export const initialGameState = {
  board: Array(8)
    .fill(null)
    .map(() => Array(8).fill(null)),

  turn: "white",

  capturedWhite: [],
  capturedBlack: [],

  moveHistory: [],
};
