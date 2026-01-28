import { useState } from 'react'
import ChessSquare from './ChessSquare'
import ChessPiece from './ChessPiece'

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export default function ChessBoard({ game, onMove, orientation = 'white' }) {
  const [selected, setSelected] = useState(null)

  const board = game.board() // 8x8 from white's perspective, rank 8 -> 1

  const ranks = orientation === 'white' ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8]
  const files = orientation === 'white' ? FILES : [...FILES].reverse()

  const handleSquareClick = (square) => {
    const piece = game.get(square)

    if (!selected) {
      if (piece && piece.color === game.turn()) {
        setSelected(square)
      }
      return
    }

    if (square === selected) {
      setSelected(null)
      return
    }

    const success = onMove(selected, square)
    if (success) {
      setSelected(null)
    }
  }

  return (
    <div
      className="grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridTemplateRows: 'repeat(8, 1fr)',
        width: '360px',
        height: '360px',
      }}
    >
      {ranks.map((rankIndex) =>
        files.map((file, fileIndex) => {
          const rankFromTop = 8 - rankIndex
          const piece = board[rankFromTop][fileIndex]
          const square = `${file}${rankIndex}`
          const isLight = (fileIndex + rankIndex) % 2 === 0
          const isSelected = selected === square

          return (
            <ChessSquare
              key={square}
              square={square}
              isLight={isLight}
              isSelected={isSelected}
              onClick={handleSquareClick}
            >
              {piece && <ChessPiece piece={piece} />}
            </ChessSquare>
          )
        }),
      )}
    </div>
  )
}
