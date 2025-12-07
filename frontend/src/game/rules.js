// rules.js
import { inBounds } from './utils.js';
import { PIECE_TYPES } from './pieces.js';

// Check if a move puts the king in check
export function isKingInCheck(board, color) {
  // Find king position
  let kingPos = null;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.type === PIECE_TYPES.king && piece.color === color) {
        kingPos = [r, c];
        break;
      }
    }
  }
  if (!kingPos) return false;

  // Scan opponent moves
  const opponent = color === 'white' ? 'black' : 'white';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.color === opponent) {
        // Simplified: reuse validator for moves
        const { getValidMoves } = require('./validator.js');
        const moves = getValidMoves(piece, [r, c], board, opponent, {});
        if (moves.some(([mr, mc]) => mr === kingPos[0] && mc === kingPos[1])) {
          return true;
        }
      }
    }
  }
  return false;
}

// Check if castling is allowed
export function canCastle(board, color, side, castlingRights) {
  if (!castlingRights[color][side]) return false;

  const row = color === 'white' ? 7 : 0;
  const kingCol = 4;
  const rookCol = side === 'kingSide' ? 7 : 0;
  const step = side === 'kingSide' ? 1 : -1;

  // Squares between king and rook must be empty
  for (let c = kingCol + step; c !== rookCol; c += step) {
    if (board[row][c]) return false;
  }

  // King cannot be in check or pass through check
  for (let c = kingCol; c !== kingCol + 2*step; c += step) {
    const tempBoard = board.map(r => r.map(cell => cell ? { ...cell } : null));
    tempBoard[row][c] = { color, type: PIECE_TYPES.king };
    if (isKingInCheck(tempBoard, color)) return false;
  }

  return true;
}

// Handle pawn promotion
export function promotePawn(piece, row) {
  if (piece.type === PIECE_TYPES.pawn && (row === 0 || row === 7)) {
    return { color: piece.color, type: PIECE_TYPES.queen };
  }
  return piece;
}

// Handle en passant target square
export function updateEnPassant(piece, fromRow, toRow, toCol) {
  if (piece.type === PIECE_TYPES.pawn && Math.abs(toRow - fromRow) === 2) {
    return [ (fromRow + toRow) / 2, toCol ];
  }
  return null;
}

