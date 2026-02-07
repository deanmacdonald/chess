import React from 'react'

export default function PlayerHeader({ name, rating, isTurn }) {
  return (
    <div
      style={{
        width: '100%',
        padding: '8px 12px',
        background: '#1e1e1e',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '6px',
        marginBottom: '6px',
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 600 }}>
        {name} <span style={{ opacity: 0.7 }}>({rating})</span>
      </div>

      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: isTurn ? '#4ade80' : '#555',
          boxShadow: isTurn ? '0 0 8px #4ade80' : 'none',
        }}
      />
    </div>
  )
}
