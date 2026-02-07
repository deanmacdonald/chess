import React, { useRef, useEffect, useState } from 'react'
import ChessPiece from './ChessPiece'

export default function ChessBoard({ board, legalMoves, lastMove, onDragStart, onDragEnd }) {
  const boardRef = useRef(null)
  const [squareSize, setSquareSize] = useState(0)

  // Resize board dynamically
  useEffect(() => {
    const updateSize = () => {
      if (boardRef.current) {
        const rect = boardRef.current.getBoundingClientRect()
        setSquareSize(rect.width / 8)
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Render the 8×8 squares
  const renderSquares = () => {
    const squares = []
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isDark = (row + col) % 2 === 1
        squares.push(
          <div
            key={`${row}-${col}`}
            style={{
              position: 'absolute',
              left: col * squareSize,
              top: row * squareSize,
              width: squareSize,
              height: squareSize,
              background: isDark ? '#b58863' : '#f0d9b5',
              transition: 'background 0.15s ease',
            }}
          />,
        )
      }
    }
    return squares
  }

  // Yellow highlight for last move
  const renderLastMove = () => {
    if (!lastMove) return null

    const { from, to } = lastMove

    return (
      <>
        {[from, to].map((sq, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: sq.col * squareSize,
              top: sq.row * squareSize,
              width: squareSize,
              height: squareSize,
              background: 'rgba(255, 255, 0, 0.35)',
              pointerEvents: 'none',
            }}
          />
        ))}
      </>
    )
  }

  // Legal move dots
  const renderLegalMoves = () => {
    if (!legalMoves) return null

    return legalMoves.map((m, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: m.col * squareSize,
          top: m.row * squareSize,
          width: squareSize,
          height: squareSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: squareSize * 0.25,
            height: squareSize * 0.25,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.25)',
          }}
        />
      </div>
    ))
  }

  // Render pieces
  const renderPieces = () => {
    const pieces = []
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col]
        if (!piece) continue

        pieces.push(
          <ChessPiece
            key={`${piece}-${row}-${col}`}
            piece={piece}
            row={row}
            col={col}
            boardRef={boardRef}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />,
        )
      }
    }
    return pieces
  }

  return (
    <div
      ref={boardRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        aspectRatio: '1 / 1',
        margin: '0 auto',
        border: '12px solid #5a3e2b',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      {renderSquares()}
      {renderLastMove()}
      {renderLegalMoves()}
      {renderPieces()}
    </div>
  )
}
