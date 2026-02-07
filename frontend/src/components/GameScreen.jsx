import { useEffect, useState } from 'react'
import Board from './board/Board'
import MoveViewer from './MoveViewer'
import ChessClock from './ChessClock'
import { makeMove, startNewGame } from '../api/chessApi'

export default function GameScreen({ whitePlayer, blackPlayer, timeControl }) {
  const [gameId, setGameId] = useState(null)
  const [fen, setFen] = useState(null)
  const [turn, setTurn] = useState(null)
  const [moves, setMoves] = useState([])

  // Load a new game on mount
  useEffect(() => {
    async function load() {
      try {
        const data = await startNewGame()
        setGameId(data.game_id)
        setFen(data.fen)
        setTurn(data.turn)
      } catch (err) {
        console.error('Failed to start game:', err)
      }
    }
    load()
  }, [])

  // Handle a move from the board
  async function handleMove(move) {
    if (!gameId) return

    try {
      const data = await makeMove(gameId, move)
      setFen(data.fen)
      setTurn(data.turn)
      setMoves((prev) => [...prev, move])
    } catch (err) {
      console.error('Move failed:', err)
    }
  }

  if (!fen) {
    return <div>Loading game...</div>
  }

  return (
    <div
      className="game-screen"
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        padding: '20px'
      }}
    >
      <div className="board-container">
        <Board fen={fen} turn={turn} onMove={handleMove} />
      </div>

      <div
        className="sidebar"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <ChessClock
          whitePlayer={whitePlayer}
          blackPlayer={blackPlayer}
          timeControl={timeControl}
        />

        <MoveViewer moves={moves} />
      </div>
    </div>
  )
}
