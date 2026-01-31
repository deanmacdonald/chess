import React from 'react'

export default function MoveViewer({ moves = [] }) {
  return (
    <div
      className="move-viewer"
      style={{
        background: '#d4b483',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
        height: 'calc(100vh - 40px)',
        overflowY: 'auto',
        color: '#3b2f2f',
        fontFamily: 'serif',
      }}
    >
      <h2
        style={{
          margin: '0 0 12px 0',
          fontSize: '1.4rem',
          fontWeight: '700',
          borderBottom: '2px solid rgba(0,0,0,0.2)',
          paddingBottom: '6px',
        }}
      >
        Moves
      </h2>

      {moves.length === 0 && <div style={{ opacity: 0.7, fontStyle: 'italic' }}>No moves yet.</div>}

      <ol style={{ paddingLeft: '20px', margin: 0 }}>
        {moves.map((move, i) => (
          <li
            key={i}
            style={{
              marginBottom: '6px',
              fontSize: '1.1rem',
              lineHeight: '1.4rem',
            }}
          >
            {move}
          </li>
        ))}
      </ol>
    </div>
  )
}
