import React from 'react'
import './board.css'

export default function Board({ position, onSquareClick }) {
  const board = []

  const pieceImage = (piece) => {
    if (!piece) return null
    const { type, color } = piece
    return `/classic/${color}${type}.svg`
  }

  for (let rank = 7; rank >= 0; rank--) {
    for (let file = 0; file < 8; file++) {
      const square = 'abcdefgh'[file] + (rank + 1)
      const piece = position[square]

      board.push(
        <div
          key={square}
          className={`square ${(file + rank) % 2 === 0 ? 'light' : 'dark'}`}
          onClick={() => onSquareClick(square)}
        >
          {piece && (
            <img
              src={pieceImage(piece)}
              alt={`${piece.color}${piece.type}`}
              className="piece"
            />
          )}
        </div>
      )
    }
  }

  return <div className="board">{board}</div>
}
