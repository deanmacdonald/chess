import React from 'react'

export default function GameList({ games = [], onSelect }) {
  return (
    <div
      className="game-list"
      style={{
        background: '#d4b483',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
        height: '100%',
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
        Game List
      </h2>

      {games.length === 0 && (
        <div style={{ opacity: 0.7, fontStyle: 'italic' }}>No saved games.</div>
      )}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {games.map((game, i) => (
          <li
            key={i}
            onClick={() => onSelect && onSelect(game)}
            style={{
              padding: '10px 12px',
              marginBottom: '8px',
              background: '#c9a97c',
              borderRadius: '6px',
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              transition: 'background 0.2s ease, transform 0.1s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#d4b483')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#c9a97c')}
          >
            <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>
              {game.title || `Game ${i + 1}`}
            </div>
            <div style={{ opacity: 0.8, fontSize: '0.95rem' }}>{game.date || 'Unknown date'}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
