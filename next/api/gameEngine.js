// Simple but functional chess engine for your API

// Board layout (uppercase = white, lowercase = black)
const initialBoard = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

let board = JSON.parse(JSON.stringify(initialBoard));
let turn = "white";

function getState() {
  return { board, turn };
}

function makeMove(from, to) {
  const [fx, fy] = algebraicToCoords(from);
  const [tx, ty] = algebraicToCoords(to);

  const piece = board[fy][fx];
  if (!piece) return;

  board[ty][tx] = piece;
  board[fy][fx] = "";

  turn = turn === "white" ? "black" : "white";
}

function getLegalMoves(from) {
  const [x, y] = algebraicToCoords(from);
  const piece = board[y][x];

  if (!piece) return [];

  const isWhite = piece === piece.toUpperCase();
  if ((isWhite && turn !== "white") || (!isWhite && turn !== "black")) {
    return [];
  }

  const type = piece.toLowerCase();
  let moves = [];

  if (type === "p") moves = pawnMoves(x, y, piece);
  if (type === "r") moves = rookMoves(x, y, piece);
  if (type === "n") moves = knightMoves(x, y, piece);
  if (type === "b") moves = bishopMoves(x, y, piece);
  if (type === "q") moves = queenMoves(x, y, piece);
  if (type === "k") moves = kingMoves(x, y, piece);

  return moves.map(([mx, my]) => coordsToAlgebraic(mx, my));
}

// ---------------------- MOVE GENERATION ----------------------

function pawnMoves(x, y, piece) {
  const moves = [];
  const dir = piece === "P" ? -1 : 1;

  // forward
  if (isEmpty(x, y + dir)) moves.push([x, y + dir]);

  // captures
  for (const dx of [-1, 1]) {
    const nx = x + dx;
    const ny = y + dir;
    if (inBounds(nx, ny) && isEnemy(nx, ny, piece)) {
      moves.push([nx, ny]);
    }
  }

  return moves;
}

function rookMoves(x, y, piece) {
  return slideMoves(x, y, piece, [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]);
}

function bishopMoves(x, y, piece) {
  return slideMoves(x, y, piece, [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]);
}

function queenMoves(x, y, piece) {
  return slideMoves(x, y, piece, [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]);
}

function kingMoves(x, y, piece) {
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  return dirs
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([nx, ny]) => inBounds(nx, ny) && !isFriendly(nx, ny, piece));
}

function knightMoves(x, y, piece) {
  const jumps = [
    [1, 2],
    [2, 1],
    [-1, 2],
    [-2, 1],
    [1, -2],
    [2, -1],
    [-1, -2],
    [-2, -1],
  ];

  return jumps
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([nx, ny]) => inBounds(nx, ny) && !isFriendly(nx, ny, piece));
}

function slideMoves(x, y, piece, dirs) {
  const moves = [];

  for (const [dx, dy] of dirs) {
    let nx = x + dx;
    let ny = y + dy;

    while (inBounds(nx, ny)) {
      if (isEmpty(nx, ny)) {
        moves.push([nx, ny]);
      } else {
        if (isEnemy(nx, ny, piece)) moves.push([nx, ny]);
        break;
      }
      nx += dx;
      ny += dy;
    }
  }

  return moves;
}

// ---------------------- HELPERS ----------------------

function inBounds(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function isEmpty(x, y) {
  return board[y][x] === "";
}

function isEnemy(x, y, piece) {
  const target = board[y][x];
  if (!target) return false;
  return (piece === piece.toUpperCase()) !== (target === target.toUpperCase());
}

function isFriendly(x, y, piece) {
  const target = board[y][x];
  if (!target) return false;
  return (piece === piece.toUpperCase()) === (target === target.toUpperCase());
}

function algebraicToCoords(square) {
  const file = square[0].toLowerCase().charCodeAt(0) - 97;
  const rank = 8 - parseInt(square[1], 10);
  return [file, rank];
}

function coordsToAlgebraic(x, y) {
  return String.fromCharCode(97 + x) + (8 - y);
}

export default {
  getState,
  getLegalMoves,
  makeMove,
};
