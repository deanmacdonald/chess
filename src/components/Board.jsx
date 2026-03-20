import { useEffect, useState } from 'react'
import Square from './Square'
import '../styles/Board.css'
import { Chess } from 'chess.js'

export default function Board() {
  const [board, setBoard] = useState([])
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const [game] = useState(new Chess())

  const loadFen = async () => {
    try {
      const res = await fetch('http://localhost:3000/fen', {
        cache: 'no-store'
      })
      const data = await res.json()
      game.load(data.fen)
      setBoard(parseFEN(data.fen))
    } catch (err) {
      setError('Failed to load FEN')
    }
  }

  const parseFEN = (fenString) => {
    const rows = fenString.split(' ')[0].split('/')
    const parsed = rows.map((row) => {
      const expanded = []
      for (const char of row) {
        if (/[1-8]/.test(char)) {
          expanded.push(...Array(parseInt(char)).fill(null))
        } else {
          const isWhite = char === char.toUpperCase()
          const type = char.toLowerCase()
          expanded.push(`${isWhite ? 'w' : 'b'}${type}`)
        }
      }
      return expanded
    })

    // Flip board so white is at the bottom
    return parsed.reverse()
  }

  const handleSquareClick = (r, c) => {
    const piece = board[r][c]

    // If no piece selected yet
    if (!selected) {
      if (piece) {
        setSelected({ r, c, piece })
      }
      return
    }

    // Attempt move
    const from = `${String.fromCharCode(97 + selected.c)}${8 - selected.r}`
    const to = `${String.fromCharCode(97 + c)}${8 - r}`

    const move = game.move({ from, to })

    if (move) {
      // Legal move → update board
      setBoard(parseFEN(game.fen()))
      setSelected(null)
    } else {
      // Illegal move → reset selection
      setSelected(null)
    }
  }

  useEffect(() => {
    loadFen()
  }, [])

  return (
    <div className="board">
      {board.map((row, r) =>
        row.map((piece, c) => (
          <Square
            key={`${r}-${c}`}
            piece={piece}
            position={{ r, c }}
            isDark={(r + c) % 2 === 1}
            onClick={() => handleSquareClick(r, c)}
            selected={selected && selected.r === r && selected.c === c}
          />
        ))
      )}
    </div>
  )
}
