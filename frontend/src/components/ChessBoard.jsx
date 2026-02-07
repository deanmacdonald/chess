import React from 'react'
import ChessSquare from './ChessSquare'

function parseFEN(fen) {
  const [placement] = fen.split(' ')
  const rows = placement.split('/')
  const board = []

  for (let r = 0; r < 8; r++) {
    const row = []
    const fenRow = rows[r]
    for (const ch of fenRow) {
      if (/[1-8]/.test(ch)) {
        const empty = parseInt(ch, 10)
        for (let i = 0; i < empty; i++) row.push(null)
      } else {
        row.push(ch)
      }
    }
    board.push(row)
  }

  return board
}

function squareFromCoords(row, col) {
  const file = 'abcdefgh'[col]
  const rank = 8 - row
  return `${file}${rank}`
}

export default function ChessBoard({
  fen,
  selectedSquare,
  legalMoves = [],
  lastMove = null,
  onSquareClick,
}) {
  const board = parseFEN(fen)

  const isLegal = (row, col) => {
    const sq = squareFromCoords(row, col)
    return legalMoves.includes(sq)
  }

  const isLast = (row, col) => {
    if (!lastMove) return false
    const sq = squareFromCoords(row, col)
    return lastMove.from === sq || lastMove.to === sq
  }

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
