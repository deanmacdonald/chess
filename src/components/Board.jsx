// src/components/Board.jsx
import { useState } from 'react'
import Piece from './Piece'
import { getBoard, move, getLegalMoves } from '../lib/chessEngine'
import { squareColor, algebraic } from '../lib/boardUtils'
import '../styles/board.css'

export default function Board({ gameId, theme, onMoveCommitted }) {
  const [board, setBoard] = useState(getBoard())
  const [selected, setSelected] = useState(null)
  const [legalMoves, setLegalMoves] = useState([])

  const squareSize = 60

  function handleSquareClick(row, col) {
    const square = algebraic(row, col)

    if (!selected) {
      const moves = getLegalMoves(square)
      if (moves.length > 0) {
        setSelected(square)
        setLegalMoves(moves.map((m) => m.to))
      }
      return
    }

    const result = move(selected, square)

    setSelected(null)
    setLegalMoves([])

    if (result) {
      setBoard(getBoard())
      if (onMoveCommitted) onMoveCommitted(result)
    }
  }

  return (
    <div
      className={`board ${theme}`}
      style={{
        gridTemplateColumns: `repeat(8, ${squareSize}px)`,
        gridTemplateRows: `repeat(8, ${squareSize}px)`
      }}
    >
      {board.map((rowArr, row) =>
        rowArr.map((pieceObj, col) => {
          const square = algebraic(row, col)
          const isHighlight = legalMoves.includes(square)

          return (
            <div
              key={square}
              className={`square ${squareColor(row, col)} ${isHighlight ? 'highlight' : ''}`}
              style={{ width: squareSize, height: squareSize }}
              onClick={() => handleSquareClick(row, col)}
            >
              <Piece
                piece={pieceObj ? pieceObj.color + pieceObj.type : null}
                squareSize={squareSize}
              />
            </div>
          )
        })
      )}
    </div>
  )
}
