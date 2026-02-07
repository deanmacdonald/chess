import React from 'react'

export default function StartScreen({ onNewGame }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#e6d5b8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          background: '#d4b483',
          padding: '40px 50px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          textAlign: 'center',
          color: '#3b2f2f',
          fontFamily: 'serif',
        }}
      >
        <h1
          style={{
            margin: 0,
            marginBottom: '20px',
            fontSize: '2.4rem',
            fontWeight: '700',
            borderBottom: '2px solid rgba(0,0,0,0.25)',
            paddingBottom: '10px',
          }}
        >
          Classic Chess
        </h1>

        <p
          style={{
            fontSize: '1.2rem',
            opacity: 0.85,
            marginBottom: '30px',
          }}
        >
          A warm, wooden chess experience.
        </p>

        <button
          onClick={onNewGame}
          style={{
            padding: '14px 24px',
            background: '#c9a97c',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.3rem',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
            transition: 'background 0.2s ease, transform 0.1s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#d4b483')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#c9a97c')}
        >
          Start New Game
        </button>
      </div>
    </div>
  )
}
