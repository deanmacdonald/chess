// src/game/validator.js

import { getKnightMoves, getRookMoves } from './pieces.js';
import { canCastle, canEnPassant, shouldPromote } from './rules.js';

export function getValidMoves(piece, position, board, lastMove, state) {
  const { type, color } = piece;

  switch (type) {
    case 'knight':
      return getKnightMoves(position).filter(([r, c]) =>
        !board[r][c] || board[r][c].color !== color
      );
    case 'rook':
      return getRookMoves(position, board, color);
    // Add cases for other pieces
    default:
      return [];
  }
}

export function isCheck(board, color) {
  // Scan board for king position
  // Check if any opponent piece can move to that square
  // Return true if king is under threat
  return false; // Placeholder
}

export function isCheckmate(board, color) {
  if (!isCheck(board, color)) return false;

  // Try all legal moves for current player
  // If none resolve check, it's checkmate
  return false; // Placeholder
}

