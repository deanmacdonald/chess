// validator.js
import { inBounds } from './utils.js';

export function getValidMoves(piece, [row, col], board, currentTurn, gameState) {
  if (!piece) return [];

  const moves = [];

  switch (piece.type) {
    case 'pawn':
      validatePawnMoves(piece, row, col, board, moves, gameState);
      break;
    case 'rook':
      validateLinearMoves(piece, row, col, board, moves, [[1,0], [-1,0], [0,1], [0,-1]]);
      break;
    case 'bishop':
      validateLinearMoves(piece, row, col, board, moves, [[1,1], [1,-1], [-1,1], [-1,-1]]);
      break;
    case 'queen':
      validateLinearMoves(piece, row, col, board, moves, [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]]);
      break;
    case 'king':
      validateKingMoves(piece, row, col, board, moves);
      break;
    case 'knight':
      validateKnightMoves(piece, row, col, board, moves);
      break;
    default:
      break;
  }

  return moves;
}

function validatePawnMoves(piece, row, col, board, moves, gameState) {
  const dir = piece.color === 'white' ? -1 : 1;
  const startRow = piece.color === 'white' ? 6 : 1;

  // Forward move
  if (inBounds(row + dir, col) && !board[row + dir][col]) {
    moves.push([row + dir, col]);
    // Double move from start
    if (row === startRow && !board[row + 2*dir][col]) {
      moves.push([row + 2*dir, col]);
    }
  }

  // Captures
  for (const dc of [-1, 1]) {
    if (inBounds(row + dir, col + dc)) {
      const target = board[row + dir][col + dc];
      if (target && target.color !== piece.color) {
        moves.push([row + dir, col + dc]);
      }
    }
  }
}

function validateLinearMoves(piece, row, col, board, moves, directions) {
  for (const [dr, dc] of directions) {
    let r = row + dr, c = col + dc;
    while (inBounds(r, c)) {
      if (!board[r][c]) {
        moves.push([r, c]);
      } else {
        if (board[r][c].color !== piece.color) {
          moves.push([r, c]);
        }
        break;
      }
      r += dr; c += dc;
    }
  }
}

function validateKingMoves(piece, row, col, board, moves) {
  const directions = [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]];
  for (const [dr, dc] of directions) {
    const r = row + dr, c = col + dc;
    if (inBounds(r, c)) {
      const target = board[r][c];
      if (!target || target.color !== piece.color) {
        moves.push([r, c]);
      }
    }
  }
}

function validateKnightMoves(piece, row, col, board, moves) {
  const jumps = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
  for (const [dr, dc] of jumps) {
    const r = row + dr, c = col + dc;
    if (inBounds(r, c)) {
      const target = board[r][c];
      if (!target || target.color !== piece.color) {
        moves.push([r, c]);
      }
    }
  }
}

