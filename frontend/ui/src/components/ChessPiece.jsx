import React from 'react'

// Map piece codes to your actual PNG assets
const PIECE_IMAGES = {
  wp: '/src/assets/white-pawn.png',
  wr: '/src/assets/white-rook.png',
  wn: '/src/assets/white-knight.png',
  wb: '/src/assets/white-bishop.png',
  wq: '/src/assets/white-queen.png',
  wk: '/src/assets/white-king.png',

  bp: '/src/assets/black-pawn.png',
  br: '/src/assets/black-rook.png',
  bn: '/src/assets/black-knight.png',
  bb: '/src/assets/black-bishop.png',
  bq: '/src/assets/black-queen.png',
  bk: '/src/assets/black-king.png',
}

export default function ChessPiece({ piece }) {
  if (!piece) return null

  const key = `${piece.color}${piece.type}`
  const src = PIECE_IMAGES[key]

  if (!src) return null

  return (
    <img
      src={src}
      alt={key}
      className="piece-img select-none"
      draggable="false"
      style={{
        width: '90%',
        height: '90%',
        objectFit: 'contain',
        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.4))',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    />
  )
}
