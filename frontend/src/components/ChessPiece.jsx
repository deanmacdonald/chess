import React, { useState, useRef, useEffect } from 'react'
import './ChessPiece.css'

export default function ChessPiece({ piece, row, col, boardRef, onDragStart, onDragEnd }) {
  if (!piece) return null

  const pieceRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 })

  const getSquarePosition = () => {
    if (!boardRef.current) return { x: 0, y: 0, size: 0 }

    const boardRect = boardRef.current.getBoundingClientRect()
    const squareSize = boardRect.width / 8

    return {
      x: col * squareSize,
      y: row * squareSize,
      size: squareSize
    }
  }

  const handlePointerDown = (e) => {
    e.preventDefault()
    setDragging(true)
    onDragStart?.(piece, row, col)

    const rect = pieceRef.current.getBoundingClientRect()
    setDragPos({
      x: e.clientX - rect.width / 2,
      y: e.clientY - rect.height / 2
    })
  }

  const handlePointerMove = (e) => {
    if (!dragging) return
    setDragPos({
      x: e.clientX - 32,
      y: e.clientY - 32
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

  const { x, y, size } = getSquarePosition()

  // Safe string concatenation (no template literal regex bug)
  const piecePath = "/pieces/" + piece.color + piece.type + ".png"

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
        transition: dragging ? 'none' : 'transform 0.1s ease'
      }}
    />
  )
}
