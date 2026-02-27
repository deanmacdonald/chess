import { Chess } from "chess.js";

const chess = new Chess();

function toSquare({ x, y }) {
  const file = String.fromCharCode("a".charCodeAt(0) + x);
  const rank = 8 - y;
  return `${file}${rank}`;
}

function fromSquare(square) {
  const file = square.charCodeAt(0) - "a".charCodeAt(0);
  const rank = parseInt(square[1], 10);
  return { x: file, y: 8 - rank };
}

function snapshot() {
  const rawBoard = chess.board();
  const board = rawBoard.map((row) =>
    row.map((p) =>
      p
        ? {
            type: p.type, // 'p','n','b','r','q','k'
            color: p.color === "w" ? "white" : "black",
          }
        : null,
    ),
  );

  const history = chess.history({ verbose: true });
  const turn = chess.turn() === "w" ? "white" : "black";

  const capturedWhite = history
    .filter((m) => m.captured && m.color === "b")
    .map((m) => ({
      type: m.captured,
      color: "white",
    }));

  const capturedBlack = history
    .filter((m) => m.captured && m.color === "w")
    .map((m) => ({
      type: m.captured,
      color: "black",
    }));

  return {
    board,
    turn,
    capturedWhite,
    capturedBlack,
    moveHistory: history,
    inCheck: chess.isCheck(),
    inCheckmate: chess.isCheckmate(),
    inStalemate: chess.isStalemate(),
    inDraw: chess.isDraw(),
  };
}

export function getInitialGameState() {
  chess.reset();
  return snapshot();
}

export function getGameSnapshot() {
  return snapshot();
}

export function getLegalMoves(from) {
  const square = toSquare(from);
  const moves = chess.moves({ square, verbose: true });
  return moves.map((m) => fromSquare(m.to));
}

export function makeMove(from, to) {
  const move = chess.move({
    from: toSquare(from),
    to: toSquare(to),
    promotion: "q",
  });

  if (!move) {
    return null; // illegal move
  }

  return snapshot();
}
