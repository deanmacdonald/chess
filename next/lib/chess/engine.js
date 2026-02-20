// Chess engine logic (JS version)

export function createInitialState() {
  return {
    board: [
      ["r","n","b","q","k","b","n","r"],
      ["p","p","p","p","p","p","p","p"],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["P","P","P","P","P","P","P","P"],
      ["R","N","B","Q","K","B","N","R"]
    ],
    turn: "white"
  };
}

export function applyMove(state, from, to) {
  const board = state.board.map(row => [...row]);

  const [fromFile, fromRank] = from.split("");
  const [toFile, toRank] = to.split("");

  const fromRow = 8 - parseInt(fromRank);
  const fromCol = fromFile.charCodeAt(0) - 97;

  const toRow = 8 - parseInt(toRank);
  const toCol = toFile.charCodeAt(0) - 97;

  const piece = board[fromRow][fromCol];
  if (!piece) {
    return { error: "No piece at source square" };
  }

  board[toRow][toCol] = piece;
  board[fromRow][fromCol] = "";

  return {
    board,
    turn: state.turn === "white" ? "black" : "white"
  };
}
