import React, { useState } from 'react'
import Board from './components/Board'
import { Chess } from 'chess.js'

export default function App() {
  const [game] = useState(new Chess())
  const [selected, setSelected] = useState(null)
  const [position, setPosition] = useState(() => {
    const pos = {}
    game.board().forEach((row, r) => {
      row.forEach((piece, f) => {
        if (piece) {
          const square = 'abcdefgh'[f] + (8 - r)
          pos[square] = { color: piece.color, type: piece.type }
        }
      })
    })
    return pos
  })

  const updatePosition = () => {
    const pos = {}
    game.board().forEach((row, r) => {
      row.forEach((piece, f) => {
        if (piece) {
          const square = 'abcdefgh'[f] + (8 - r)
          pos[square] = { color: piece.color, type: piece.type }
        }
      })
    })
    setPosition(pos)
  }

  const handleSquareClick = (square) => {
    if (!selected) {
      setSelected(square)
      return
    }

    const move = game.move({
      from: selected,
      to: square,
      promotion: 'q'
    })

    if (move) {
      updatePosition()
    }

    setSelected(null)
  }

  return (
    <div style={{ padding: '40px', color: 'white' }}>
      <h1 style={{ marginBottom: '20px' }}>React Chessboard</h1>

      <div
        style={{
          width: '420px',
          aspectRatio: '1',
          border: '4px solid red',
          margin: '0 auto'
        }}
      >
        <Board position={position} onSquareClick={handleSquareClick} />
      </div>
    </div>
  )
}
