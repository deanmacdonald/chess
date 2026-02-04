import React from 'react'
import ChessSquare from './ChessSquare'

/* -----------------------------------------
   SAFE FEN PARSER WITH VALIDATION
----------------------------------------- */
function parseFEN(fen) {
  if (!fen || typeof fen !== 'string') {
    console.warn('ChessBoard: Missing or invalid FEN:', fen)
    return null
  }

  const parts = fen.trim().split(' ')
  const placement = parts[0]

  if (!placement) {
    console.warn('ChessBoard: FEN missing placement section:', fen)
    return null
  }

  const rows = placement.split('/')
  if (rows.length !== 8) {
    console.warn('ChessBoard: FEN does not contain 8 rows:', fen)
    return null
  }

  const board = []

  for (let r = 0; r < 8; r++) {
    const fenRow = rows[r]
    if (!fenRow) return null

    const row = []

    for (const ch of fenRow) {
      if (/[1-8]/.test(ch)) {
        const empty = parseInt(ch, 10)
        for (let i = 0; i < empty; i++) row.push(null)
      } else {
        row.push(ch)
      }
    }

    if (row.length !== 8) {
      console.warn('ChessBoard: Row does not have 8 squares:', fenRow)
      return null
    }

    board.push(row)
  }

  return board
}

/* -----------------------------------------
   COORD → SQUARE ("a8".."h1")
----------------------------------------- */
function squareFromCoords(row, col) {
  const file = 'abcdefgh'[col]
  const rank = 8 - row
  return `${file}${rank}`
}

/* -----------------------------------------
   MAIN COMPONENT
----------------------------------------- */
export default function ChessBoard({
  fen,
  selectedSquare,
  legalMoves = [],
  lastMove = null,
  onSquareClick,
}) {
  const board = parseFEN(fen)

  // If FEN is invalid, show a friendly message instead of crashing
  if (!board) {
    return (
      <div
        style={{
          padding: '20px',
          fontSize: '1.2rem',
          fontFamily: 'serif',
          color: '#5a3e2b',
        }}
      >
        Unable to load board — invalid FEN from server.
      </div>
    )
  }

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
