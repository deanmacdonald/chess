import React from 'react'
import ChessSquare from './ChessSquare'

export default function ChessBoard({
  board,
  selectedSquare,
  legalMoves = [],
  lastMove = null,
  onSquareClick,
}) {
  // Helper: check if a square is in legalMoves
  const isLegal = (row, col) => legalMoves.some((m) => m.row === row && m.col === col)

  // Helper: check if square is last move
  const isLast = (row, col) =>
    lastMove &&
    ((lastMove.from.row === row && lastMove.from.col === col) ||
      (lastMove.to.row === row && lastMove.to.col === col))

  return (
    <div
      className="chessboard"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridTemplateRows: 'repeat(8, 1fr)',
        width: '480px',
        height: '480px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
      }}
    >
      {board.map((rowArray, row) =>
        rowArray.map((square, col) => {
          const isLight = (row + col) % 2 === 0
          const isSelected =
            selectedSquare && selectedSquare.row === row && selectedSquare.col === col

          return (
            <ChessSquare
              key={`${row}-${col}`}
              square={{ row, col }}
              piece={square}
              isLight={isLight}
              isSelected={isSelected}
              isLegalMove={isLegal(row, col)}
              isLastMove={isLast(row, col)}
              onClick={() => onSquareClick(row, col)}
            />
          )
        }),
      )}
    </div>
  )
}
