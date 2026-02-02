import { useEffect, useState } from 'react'
import ChessBoard from './ChessBoard'
import MoveViewer from './MoveViewer'
import ChessClock from './ChessClock'
import { sendMove, startNewGame } from '../api/chessApi'

export default function GameScreen({ whitePlayer, blackPlayer, timeControl }) {
  const [gameId, setGameId] = useState(null)
  const [state, setState] = useState(null)
  const [selected, setSelected] = useState(null)
  const [legalMoves, setLegalMoves] = useState([])
  const [lastMove, setLastMove] = useState(null)

  /* -----------------------------
     LOAD INITIAL GAME STATE
  ----------------------------- */
  useEffect(() => {
    async function load() {
      const newGame = await startNewGame()
      if (newGame?.game_id && newGame?.state) {
        setGameId(newGame.game_id)
        setState(newGame.state)
      }
    }
    load()
  }, [])

  /* -----------------------------
     HANDLE SQUARE CLICK
  ----------------------------- */
  const handleSquareClick = async (row, col) => {
    if (!state || !gameId) return

    const square = convertToSquare(row, col)

    // Selecting a piece
    if (!selected) {
      const moves = state.legal_moves?.[square]
      if (moves?.length) {
        setSelected({ row, col, square })
        setLegalMoves(moves)
      }
      return
    }

    // Clicking a legal destination
    if (legalMoves.includes(square)) {
      const uciMove = `${selected.square}${square}`

      const result = await sendMove(gameId, uciMove)

      if (result?.status === 'ok') {
        setState(result.state)
        setLastMove({ from: selected.square, to: square })
      }

      setSelected(null)
      setLegalMoves([])
      return
    }

    // Clicking elsewhere clears selection
    setSelected(null)
    setLegalMoves([])
  }

  /* -----------------------------
     CONVERT BOARD COORDINATES
     row=0..7, col=0..7 → "a8".."h1"
  ----------------------------- */
  function convertToSquare(row, col) {
    const file = 'abcdefgh'[col]
    const rank = 8 - row
    return `${file}${rank}`
  }

  /* -----------------------------
     RENDER
  ----------------------------- */
  if (!state) {
    return (
      <div style={{ fontFamily: 'serif', fontSize: '1.6rem', color: '#3b2f2f' }}>
        Loading game…
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        padding: '24px',
        background: '#e6d5b8',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      {/* LEFT SIDE: BOARD */}
      <div>
        <ChessBoard
          fen={state.fen}
          selectedSquare={selected}
          legalMoves={legalMoves}
          lastMove={lastMove}
          onSquareClick={handleSquareClick}
        />
      </div>

      {/* RIGHT SIDE: INFO PANEL */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="panel player-panel">
          <strong>White:</strong> {whitePlayer.name} ({whitePlayer.rating})
        </div>

        <ChessClock
          whitePlayer={whitePlayer}
          blackPlayer={blackPlayer}
          timeControl={timeControl}
          turn={state.turn}
        />

        <MoveViewer moves={state.history} />

        {state.gameOver && (
          <div
            className="panel"
            style={{
              fontSize: '1.4rem',
              fontWeight: '700',
              textAlign: 'center',
              color: '#8b0000',
            }}
          >
            {state.checkmate && 'Checkmate'}
            {state.stalemate && 'Stalemate'}
            {state.draw && 'Draw'}
          </div>
        )}
      </div>
    </div>
  )
}
