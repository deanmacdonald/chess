import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MoveViewer = ({ gameId }) => {
  const [moves, setMoves] = useState([])

  useEffect(() => {
    if (gameId) {
      axios
        .get(`/api/games/${gameId}/moves`)
        .then((res) => setMoves(res.data))
        .catch((err) => console.error('Error fetching moves:', err))
    }
  }, [gameId])

  return (
    <div>
      <h3>♟️ Moves for Game #{gameId}</h3>
      <ol>
        {moves.map((move) => (
          <li key={move.id}>{move.move_text}</li>
        ))}
      </ol>
    </div>
  )
}

export default MoveViewer
