import React, { useState } from 'react'
import ChessBoard from './ChessBoard'

export default function ChessTest() {
  // Simple starting position for testing visuals
  const initialBoard = [
    [
      { color: 'b', type: 'r' },
      { color: 'b', type: 'n' },
      { color: 'b', type: 'b' },
      { color: 'b', type: 'q' },
      { color: 'b', type: 'k' },
      { color: 'b', type: 'b' },
      { color: 'b', type: 'n' },
      { color: 'b', type: 'r' },
    ],
    Array(8).fill({ color: 'b', type: 'p' }),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill({ color: 'w', type: 'p' }),
    [
      { color: 'w', type: 'r' },
      { color: 'w', type: 'n' },
      { color: 'w', type: 'b' },
      { color: 'w', type: 'q' },
      { color: 'w', type: 'k' },
      { color: 'w', type: 'b' },
      { color: 'w', type: 'n' },
      { color: 'w', type: 'r' },
    ],
  ]

  const [board, setBoard] = useState(initialBoard)
  const [selected, setSelected] = useState(null)
  const [legalMoves, setLegalMoves] = useState([])
  const [lastMove, setLastMove] = useState(null)

  const handleSquareClick = (row, col) => {
    const piece = board[row][col]

    // Select a piece
    if (piece) {
      setSelected({ row, col })
      // Fake legal moves for testing visuals
      setLegalMoves([
        { row: row + 1, col },
        { row: row + 2, col },
      ])
      return
    }

    // Move selected piece (simple test move)
    if (selected) {
      const newBoard = board.map((r) => r.slice())
      newBoard[row][col] = board[selected.row][selected.col]
      newBoard[selected.row][selected.col] = null

      setBoard(newBoard)
      setLastMove({ from: selected, to: { row, col } })
      setSelected(null)
      setLegalMoves([])
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#e6d5b8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div>
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            fontFamily: 'serif',
            color: '#3b2f2f',
            fontSize: '2rem',
          }}
        >
          Chess UI Test Board
        </h1>

        <ChessBoard
          board={board}
          selectedSquare={selected}
          legalMoves={legalMoves}
          lastMove={lastMove}
          onSquareClick={handleSquareClick}
        />
      </div>
    </div>
  )
}
