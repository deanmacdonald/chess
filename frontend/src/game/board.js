// src/game/board.js

export function initializeBoard() {
  const board = Array(8).fill(null).map(() => Array(8).fill(null));

  const setup = {
    0: ['black-rook', 'black-knight', 'black-bishop', 'black-queen', 'black-king', 'black-bishop', 'black-knight', 'black-rook'],
    1: Array(8).fill('black-pawn'),
    6: Array(8).fill('white-pawn'),
    7: ['white-rook', 'white-knight', 'white-bishop', 'white-queen', 'white-king', 'white-bishop', 'white-knight', 'white-rook']
  };

  for (const row in setup) {
    for (let col = 0; col < 8; col++) {
      const name = setup[row][col];
      const [color, type] = name.split('-');
      board[row][col] = { type, color };
    }
  }

  return board;
}

