import { useState } from 'react'

export default function useMoves() {
  const [moves, setMoves] = useState([])

  function addMove(move) {
    setMoves((prev) => [...prev, move])
  }

  return {
    moves,
    addMove,
  }
}
