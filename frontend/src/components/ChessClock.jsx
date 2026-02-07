import React from 'react'

export default function ChessClock({ whitePlayer, blackPlayer, timeControl, turn }) {
  return (
    <div
      className="chess-clock-panel"
      style={{
        background: '#d4b483',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
        color: '#3b2f2f',
        fontFamily: 'serif',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>Time Control: {timeControl}</div>
      <div>
        <strong>White:</strong> {whitePlayer.name} ({whitePlayer.rating})
      </div>
      <div>
        <strong>Black:</strong> {blackPlayer.name} ({blackPlayer.rating})
      </div>
      <div style={{ marginTop: '8px' }}>
        <strong>Turn:</strong> {turn === 'w' || turn === 'white' ? 'White' : 'Black'}
      </div>
    </div>
  )
}
