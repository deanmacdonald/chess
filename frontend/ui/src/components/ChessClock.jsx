import React from 'react'

export default function ChessClock({ time, active }) {
  // Format seconds → mm:ss
  const format = (t) => {
    const m = Math.floor(t / 60)
    const s = t % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div
      className="chess-clock"
      style={{
        width: '480px',
        padding: '14px 20px',
        background: active ? '#d4b483' : '#c9a97c',
        color: '#3b2f2f',
        fontSize: '2rem',
        fontWeight: '600',
        textAlign: 'center',
        borderRadius: '6px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
        transition: 'background 0.2s ease, transform 0.15s ease',
        transform: active ? 'scale(1.02)' : 'scale(1.0)',
        userSelect: 'none',
      }}
    >
      {format(time)}
    </div>
  )
}
