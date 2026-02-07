import { useState, useEffect } from 'react'

export default function useGameState() {
  const [fen, setFen] = useState('startpos')
  const [turn, setTurn] = useState('w')
  const [loading, setLoading] = useState(true)

  // Load initial game state from backend
  useEffect(() => {
    fetch('/api/game')
      .then((res) => res.json())
      .then((data) => {
        setFen(data.fen || 'startpos')
        setTurn(data.turn || 'w')
        setLoading(false)
      })
      .catch(() => {
        // fallback if backend is offline
        setFen('startpos')
        setTurn('w')
        setLoading(false)
      })
  }, [])

  return {
    fen,
    turn,
    loading,
    setFen,
    setTurn,
  }
}
