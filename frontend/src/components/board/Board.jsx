import { useState, useEffect } from 'react'
import './board.css'

const FILES = ['a','b','c','d','e','f','g','h']
const RANKS = ['8','7','6','5','4','3','2','1']

// Unicode pieces for quick rendering
const PIECES = {
  'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
  'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔'
}

export default function Board({ fen, turn, onMove }) {
  const [selected, setSelected] = useState(null)
  const [board, setBoard] = useState([])

  // Parse FEN into 2D array
  useEffect(() => {
    const rows = fen.split(' ')[0].split('/')
    const parsed = rows.map(row => {
      const squares = []
      for (const char of row) {
        if (Number.isInteger(parseInt(char))) {
          for (let i = 0; i < parseInt(char); i++) squares.push(null)
        } else {
          squares.push(char)
        }
      }
      return squares
    })
    setBoard(parsed)
  }, [fen])

  function handleSquareClick(file, rank) {
    const square = file + rank

    if (!selected) {
      setSelected(square)
      return
    }

    if (selected === square) {
      setSelected(null)
      return
    }

    const move = selected + square
    onMove(move)
    setSelected(null)
  }

  return (
    <div className="board">
      {RANKS.map((rank, rIndex) => (
        <div key={rank} className="rank">
          {FILES.map((file, fIndex) => {
            const piece = board[rIndex]?.[fIndex]
            const square = file + rank
            const isDark = (rIndex + fIndex) % 2 === 1
            const isSelected = selected === square

            return (
              <div
                key={square}
                className={`square ${isDark ? 'dark' : 'light'} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSquareClick(file, rank)}
              >
                {piece ? <span className="piece">{PIECES[piece]}</span> : null}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
