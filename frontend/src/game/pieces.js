// pieces.js

export const PIECE_TYPES = {
  pawn: 'pawn',
  rook: 'rook',
  knight: 'knight',
  bishop: 'bishop',
  queen: 'queen',
  king: 'king',
};

export const COLORS = {
  white: 'white',
  black: 'black',
};

// Unicode symbols (optional for text rendering)
export const PIECE_SYMBOLS = {
  white: {
    pawn: '♙',
    rook: '♖',
    knight: '♘',
    bishop: '♗',
    queen: '♕',
    king: '♔',
  },
  black: {
    pawn: '♟',
    rook: '♜',
    knight: '♞',
    bishop: '♝',
    queen: '♛',
    king: '♚',
  },
};

// Factory function to create a piece object
export function createPiece(color, type) {
  return { color, type };
}

// Check if a given object is a valid piece
export function isPiece(obj) {
  return obj && COLORS[obj.color] && PIECE_TYPES[obj.type];
}

