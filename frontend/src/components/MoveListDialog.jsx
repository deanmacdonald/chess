import React from 'react'

export default function MoveListDialog({ moves, open, onClose }) {
  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '90%',
          maxHeight: '70%',
          background: '#1e1e1e',
          color: '#fff',
          padding: 16,
          borderRadius: 8,
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ marginBottom: 12, fontSize: 20, fontWeight: 700 }}>
          Move List
        </h2>

        {moves.map((m, i) => (
          <div
            key={i}
            style={{
              padding: '4px 0',
              borderBottom: '1px solid #333',
              fontSize: 16,
            }}
          >
            {i + 1}. {m.white} {m.black || ''}
          </div>
        ))}
      </div>
    </div>
  )
}
