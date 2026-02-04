import { useEffect, useState, useCallback } from 'react'
import { getGameState, startNewGame } from '../api/chessApi'

export default function useGameState() {
  const [gameId, setGameId] = useState('default')
  const [state, setState] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadGame = useCallback(
    async (id = gameId) => {
      setLoading(true)
      const data = await getGameState(id)

      if (!data) {
        setError('Failed to load game')
        setLoading(false)
        return
      }

      setState(data.state)
      setGameId(data.game_id)
      setLoading(false)
    },
    [gameId],
  )

  const newGame = useCallback(async () => {
    setLoading(true)
    const data = await startNewGame()

    if (!data) {
      setError('Failed to start new game')
      setLoading(false)
      return
    }

    setState(data.state)
    setGameId(data.game_id)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadGame()
  }, [])

  return {
    gameId,
    state,
    loading,
    error,
    reload: loadGame,
    newGame,
  }
}
