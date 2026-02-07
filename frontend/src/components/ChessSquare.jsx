import React from 'react'

export default function ChessSquare({
  row,
  col,
  isLight,
  isSelected,
  isLegalMove,
  isLastMove,
  squareSize,
  onClick,
}) {
  // Base wood colors
  const lightColor = '#f0d9b5'
  const darkColor = '#b58863'

  // Highlight overlays
  const highlight = isSelected
    ? 'inset 0 0 0 3px rgba(255, 215, 0, 0.9)'
    : isLastMove
      ? 'inset 0 0 0 3px rgba(255, 255, 0, 0.6)'
      : isLegalMove
        ? 'inset 0 0 0 3px rgba(0, 200, 0, 0.6)'
        : 'none'

  return (
    <div
      onClick={onClick}
      className="chess-square select-none"
      style={{
        position: 'absolute',
        left: col * squareSize,
        top: row * squareSize,
        width: squareSize,
        height: squareSize,
        backgroundColor: isLight ? lightColor : darkColor,
        boxShadow: highlight,
        transition: 'box-shadow 0.15s ease',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    />
  )
}
