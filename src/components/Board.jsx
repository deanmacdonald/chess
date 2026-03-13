import React, { useState, useMemo, useCallback } from 'react'
import Square from './Square'
import Piece from './Piece'
import { Chess } from 'chess.js'

const Board = React.memo(function Board() {
  const [game, setGame] = useState(() => new Chess())
  const [dragging, setDragging] = useState(null)

  // Freeze board array so it only recalculates when FEN changes
  const board = useMemo(() => game.board(), [game.fen()])

  // Handle piece drag start
  const onDragStart = useCallback((square, piece) => {
    setDragging({ from: square, piece })
  }, [])

  // Handle piece drop
  const onDrop = useCallback(
    (square) => {
      if (!dragging) return

      const move = game.move({
        from: dragging.from,
        to: square,
        promotion: 'q'
      })

      if (move) {
        setGame(new Chess(game.fen()))
      }

      setDragging(null)
    },
    [dragging, game]
  )

  // Render 8×8 grid
  return (
    <div
      style={{
        width: '100vw',
        maxWidth: 500,
        aspectRatio: '1 / 1',
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridTemplateRows: 'repeat(8, 1fr)',
        border: '3px solid #0ff',
        boxShadow: '0 0 20px #0ff'
      }}
    >
      {board.flat().map((square, idx) => {
        const row = Math.floor(idx / 8)
        const col = idx % 8
        const isDark = (row + col) % 2 === 1

        const piece = square
          ? `${square.color}${square.type}` // e.g. "wp", "bk"
          : null

        const file = 'abcdefgh'[col]
        const rank = 8 - row
        const squareName = `${file}${rank}`

        return (
          <div
            key={squareName}
            onMouseDown={() => piece && onDragStart(squareName, piece)}
            onMouseUp={() => onDrop(squareName)}
            onTouchStart={() => piece && onDragStart(squareName, piece)}
            onTouchEnd={() => onDrop(squareName)}
          >
            <Square isDark={isDark}>
              <Piece piece={piece} />
            </Square>
          </div>
        )
      })}
    </div>
  )
})

export default Board
