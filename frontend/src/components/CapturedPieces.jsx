import React from 'react'

export default function CapturedPieces({ pieces }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 4,
        padding: '6px 0',
        minHeight: 32,
      }}
    >
      {pieces.map((p, i) => (
        <img
          key={i}
          src={"/pieces/" + p.color + p.type + ".png"}
          alt={p.type}
          style={{
            width: 28,
            height: 28,
            objectFit: 'contain',
          }}
        />
      ))}
    </div>
  )
}
