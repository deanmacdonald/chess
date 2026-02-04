import { useCallback } from 'react'
import { sendMove } from '../api/chessApi'

export default function useMoves({ gameId, onUpdate }) {
  const makeMove = useCallback(
    async (uciMove) => {
      const data = await sendMove(gameId, uciMove)

      if (!data) {
        console.error('Move failed')
        return null
      }

      if (onUpdate) {
        onUpdate(data.state)
      }

      return data.state
    },
    [gameId, onUpdate],
  )

  return { makeMove }
}
