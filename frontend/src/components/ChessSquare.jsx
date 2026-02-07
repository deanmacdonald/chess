import React from 'react'
import ChessPiece from './ChessPiece'

export default function ChessSquare({
  square,
  piece,
  isLight,
  isSelected,
  isLegalMove,
  isLastMove,
  onClick,
}) {
  // Base wood colors
  const lightColor = '#f0d9b5' // light wood
  const darkColor = '#b58863' // dark wood

  // Highlight overlays
  const highlight = isSelected
    ? 'inset 0 0 0 3px rgba(255, 215, 0, 0.9)' // gold border
    : isLastMove
      ? 'inset 0 0 0 3px rgba(255, 255, 0, 0.6)' // yellow border
      : isLegalMove
        ? 'inset 0 0 0 3px rgba(0, 200, 0, 0.6)' // green border
        : 'none'

  return (
    <div
      onClick={onClick}
      className="chess-square select-none"
      style={{
        backgroundColor: isLight ? lightColor : darkColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        boxShadow: highlight,
        cursor: 'pointer',
        transition: 'box-shadow 0.15s ease',
      }}
    >
      {piece && <ChessPiece piece={piece} />}
    </div>
  )
}
