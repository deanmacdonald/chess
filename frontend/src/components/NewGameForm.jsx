import React, { useState } from 'react'

export default function NewGameForm({ onStart }) {
  const [whiteName, setWhiteName] = useState('White Player')
  const [blackName, setBlackName] = useState('Black Player')
  const [whiteRating, setWhiteRating] = useState(1500)
  const [blackRating, setBlackRating] = useState(1500)
  const [timeControl, setTimeControl] = useState(300) // 5 minutes default

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onStart) {
      onStart({
        whitePlayer: { name: whiteName, rating: whiteRating },
        blackPlayer: { name: blackName, rating: blackRating },
        timeControl,
      })
    }
  }

  return (
    <div
      style={{
        background: '#d4b483',
        padding: '24px',
        borderRadius: '10px',
        width: '420px',
        margin: '40px auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        color: '#3b2f2f',
        fontFamily: 'serif',
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: '16px',
          fontSize: '1.8rem',
          fontWeight: '700',
          textAlign: 'center',
          borderBottom: '2px solid rgba(0,0,0,0.25)',
          paddingBottom: '8px',
        }}
      >
        New Game
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        {/* White Player */}
        <div>
          <label style={{ fontWeight: '600', fontSize: '1.1rem' }}>White Player</label>
          <input
            type="text"
            value={whiteName}
            onChange={(e) => setWhiteName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            value={whiteRating}
            onChange={(e) => setWhiteRating(Number(e.target.value))}
            style={inputStyle}
          />
        </div>

        {/* Black Player */}
        <div>
          <label style={{ fontWeight: '600', fontSize: '1.1rem' }}>Black Player</label>
          <input
            type="text"
            value={blackName}
            onChange={(e) => setBlackName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            value={blackRating}
            onChange={(e) => setBlackRating(Number(e.target.value))}
            style={inputStyle}
          />
        </div>

        {/* Time Control */}
        <div>
          <label style={{ fontWeight: '600', fontSize: '1.1rem' }}>Time Control (seconds)</label>
          <input
            type="number"
            value={timeControl}
            onChange={(e) => setTimeControl(Number(e.target.value))}
            style={inputStyle}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          style={{
            padding: '12px',
            background: '#c9a97c',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1.2rem',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
            transition: 'background 0.2s ease, transform 0.1s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#d4b483')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#c9a97c')}
        >
          Start Game
        </button>
      </form>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '6px',
  marginBottom: '10px',
  borderRadius: '6px',
  border: '1px solid rgba(0,0,0,0.3)',
  fontSize: '1rem',
  background: '#f5e6c8',
  color: '#3b2f2f',
}
