// src/components/Piece.jsx
export default function Piece({ piece, squareSize }) {
  if (!piece) return null

  // piece format: "WP", "BK", etc.
  const file = piece.toLowerCase() // wp, bk, etc.

  return (
    <img
      src={`/assets/pieces/classic/${file}.svg`}
      alt={piece}
      style={{
        width: squareSize,
        height: squareSize,
        userSelect: 'none',
        pointerEvents: 'none'
      }}
    />
  )
}
