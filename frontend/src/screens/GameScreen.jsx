import React, { useState, useEffect } from 'react'
import ChessBoard from '../components/ChessBoard'
import PlayerHeader from '../components/PlayerHeader'
import ChessClock from '../components/ChessClock'
import CapturedPieces from '../components/CapturedPieces'
import MoveListDialog from '../components/MoveListDialog'
import { Chess } from 'chess.js'

export default function GameScreen() {
  const [game] = useState(new Chess())

  const [turn, setTurn] = useState('white')
  const [whiteTime, setWhiteTime] = useState(300)
  const [blackTime, setBlackTime] = useState(300)
  const [capturedWhite, setCapturedWhite] = useState([])
  const [capturedBlack, setCapturedBlack] = useState([])
  const [moveHistory, setMoveHistory] = useState([])
  const [showMoves, setShowMoves] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (turn === 'white') {
        setWhiteTime((t) => Math.max(t - 1, 0))
      } else {
        setBlackTime((t) => Math.max(t - 1, 0))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [turn])

  const handleMove = (piece, fromRow, fromCol, clientX, clientY) => {
    // You will wire this up once your drag logic is finalized
  }

  return (
    <div style={{ padding: 12, maxWidth: 500, margin: '0 auto' }}>
      <PlayerHeader name="Black" rating={1500} isTurn={turn === 'black'} />
      <ChessClock
        timeLeft={blackTime}
        running={turn === 'black'}
        onPress={() => setTurn('white')}
      />
      <CapturedPieces pieces={capturedBlack} />

      <ChessBoard board={game.board()} onDragEnd={handleMove} />

      <CapturedPieces pieces={capturedWhite} />
      <ChessClock
        timeLeft={whiteTime}
        running={turn === 'white'}
        onPress={() => setTurn('black')}
      />
      <PlayerHeader name="Dean" rating={1400} isTurn={turn === 'white'} />

      <button
        onClick={() => setShowMoves(true)}
        style={{
          width: '100%',
          padding: 12,
          marginTop: 12,
          background: '#333',
          color: '#fff',
          borderRadius: 6,
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        Show Moves
      </button>

      <MoveListDialog moves={moveHistory} open={showMoves} onClose={() => setShowMoves(false)} />
    </div>
  )
}
