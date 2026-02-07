import React, { useEffect, useRef } from 'react'

export default function MoveViewer({ moves = [] }) {
  const containerRef = useRef(null)

  // Auto-scroll to bottom when new moves arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [moves])

  // Pair moves into rows
  const rows = []
  for (let i = 0; i < moves.length; i += 2) {
    rows.push({
      white: moves[i],
      black: moves[i + 1] || ''
    })
  }

  const renderMove = (move) => {
    if (!move) return ''
    if (typeof move === 'string') return move
    if (move.san) return move.san
    if (move.uci) return move.uci
    return JSON.stringify(move)
  }

  return (
    <div
      className="move-viewer"
      style={{
        background: '#d4b483',
        borderRadius: '10px',
        padding: '16px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
        height: 'calc(100vh - 40px)',
        width: '280px',
        color: '#3b2f2f',
        fontFamily: 'serif',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <h2
        style={{
          margin: '0 0 12px 0',
          fontSize: '1.4rem',
          fontWeight: '700',
          borderBottom: '2px solid rgba(0,0,0,0.25)',
          paddingBottom: '6px',
          textAlign: 'center'
        }}
      >
        Moves
      </h2>

      {/* Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '40px 1fr 1fr',
          fontWeight: 'bold',
          borderBottom: '1px solid rgba(0,0,0,0.3)',
          paddingBottom: '6px',
          marginBottom: '6px'
        }}
      >
        <div>#</div>
        <div style={{ textAlign: 'center' }}>White</div>
        <div style={{ textAlign: 'center' }}>Black</div>
      </div>

      {/* Scrollable move list */}
      <div
        ref={containerRef}
        style={{
          overflowY: 'auto',
          flexGrow: 1,
          paddingRight: '4px'
        }}
      >
        {rows.map((row, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr 1fr',
              padding: '6px 0',
              background: index % 2 === 0 ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.05)',
              borderRadius: '4px',
              marginBottom: '2px'
            }}
          >
            <div>{index + 1}.</div>
            <div style={{ textAlign: 'center' }}>{renderMove(row.white)}</div>
            <div style={{ textAlign: 'center' }}>{renderMove(row.black)}</div>
          </div>
        ))}

        {moves.length === 0 && (
          <div style={{ opacity: 0.7, fontStyle: 'italic' }}>No moves yet.</div>
        )}
      </div>
    </div>
  )
}
