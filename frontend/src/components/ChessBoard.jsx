import React, { useState, useEffect } from 'react';
import { initializeBoard } from '../game/board.js';
import { getValidMoves } from '../game/validator.js';

export default function ChessBoard() {
  const [board, setBoard] = useState(initializeBoard());
  const [selected, setSelected] = useState(null);
  const [validMoves, setValidMoves] = useState([]);

  const handleSquareClick = (row, col) => {
    const piece = board[row][col];

    if (selected) {
      const isValid = validMoves.some(([r, c]) => r === row && c === col);
      if (isValid) {
        const newBoard = board.map(row => row.slice());
        newBoard[row][col] = board[selected[0]][selected[1]];
        newBoard[selected[0]][selected[1]] = null;
        setBoard(newBoard);
        setSelected(null);
        setValidMoves([]);
      } else {
        setSelected(null);
        setValidMoves([]);
      }
    } else if (piece) {
      setSelected([row, col]);
      const moves = getValidMoves(piece, [row, col], board, null, {});
      setValidMoves(moves);
    }
  };

  return (
    <div className="chess-board">
      {board.map((rowArr, row) =>
        rowArr.map((square, col) => {
          const isHighlighted = validMoves.some(([r, c]) => r === row && c === col);
          const squareColor = (row + col) % 2 === 0 ? 'light' : 'dark';
          return (
            <div
              key={`${row}-${col}`}
              className={`square ${squareColor} ${isHighlighted ? 'highlight' : ''}`}
              onClick={() => handleSquareClick(row, col)}
            >
              {square && (
                <img
                  src={`/assets/pieces/${square.color}-${square.type}.png`}
                  alt={`${square.color} ${square.type}`}
                  className="piece"
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

