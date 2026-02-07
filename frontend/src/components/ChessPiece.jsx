import React, { useState, useRef, useEffect } from 'react'
import './ChessPiece.css'

export default function ChessPiece({ piece, row, col, boardRef, onDragStart, onDragEnd }) {
  const pieceRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 })

  const getSquare = () => {
    if (!boardRef.current) return { x: 0, y: 0, size: 0 }
    const rect = boardRef.current.getBoundingClientRect()
    const size = rect.width / 8
    return { x: col * size, y: row * size, size }
  }

  const handlePointerDown = (e) => {
    e.preventDefault()
    setDragging(true)
    onDragStart?.(piece, row, col)

    const { size } = getSquare()
    setDragPos({
      x: e.clientX - size / 2,
      y: e.clientY - size / 2,
    })
  }

  const handlePointerMove = (e) => {
    if (!dragging) return
    const { size } = getSquare()
    setDragPos({
      x: e.clientX - size / 2,
      y: e.clientY - size / 2,
    })
  }

  const handlePointerUp = (e) => {
    if (!dragging) return
    setDragging(false)
    onDragEnd?.(piece, row, col, e.clientX, e.clientY)
  }

  useEffect(() => {
    if (dragging) {
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
    } else {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [dragging])

  const { x, y, size } = getSquare()
  const piecePath = `/pieces/${piece.color}${piece.type}.png`

  return (
    <img
      ref={pieceRef}
      src={piecePath}
      alt={piece.type}
      className="chess-piece"
      onPointerDown={handlePointerDown}
      draggable={false}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        left: dragging ? dragPos.x : x,
        top: dragging ? dragPos.y : y,
        cursor: dragging ? 'grabbing' : 'grab',
        zIndex: dragging ? 999 : 10,
        transition: dragging ? 'none' : 'opacity 0.1s ease',
      }}
    />
  )
}
