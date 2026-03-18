import React, { useEffect, useState } from 'react'
import { loadFen } from './loadFen'
import Board from './components/Board'

export default function App() {
  const [state, setState] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function init() {
      try {
        const data = await loadFen()
        if (!cancelled) {
          setState(data)
          setLoading(false)
        }
      } catch (err) {
        console.error(err)
        if (!cancelled) {
          setError('Failed to load game')
          setLoading(false)
        }
      }
    }

    init()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="chess-container">
        <div className="status-text">Loading game…</div>
      </div>
    )
  }

  if (error || !state) {
    return (
      <div className="chess-container">
        <div className="status-text error">{error || 'No game state'}</div>
      </div>
    )
  }

  return (
    <div className="chess-container">
      <h1 className="chess-title">NEON CHESS</h1>
      <Board state={state} onStateChange={setState} />
    </div>
  )
}
