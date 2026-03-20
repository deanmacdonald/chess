import React from 'react'

export default function MoveList({ moves }) {
  return (
    <div className="move-list">
      {moves.map((m, i) => (
        <div key={i} className="move">
          {i + 1}. {m}
        </div>
      ))}
    </div>
  )
}
