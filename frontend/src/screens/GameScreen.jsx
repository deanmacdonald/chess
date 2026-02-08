import React from 'react'
import ChessBoard from '../components/ChessBoard'
import PlayerHeader from '../components/PlayerHeader'
import ChessClock from '../components/ChessClock'
import CapturedPieces from '../components/CapturedPieces'
import MoveListDialog from '../components/MoveListDialog'
import useGameState from '../hooks/useGameState'

export default function GameScreen() {
  const {
    board,
    turn,
    whiteTime,
    blackTime,
    capturedWhite,
    capturedBlack,
    moveHistory,
    legalMoves,
    lastMove,
    handleDragStart,
    handleDragEnd,
  } = useGameState()

  const [showMoves, setShowMoves] = React.useState(false)

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',     // <-- centers EVERYTHING
        justifyContent: 'flex-start',
        padding: 12,
      }}
    >
      <PlayerHeader name="Black" rating={1500} isTurn={turn === 'black'} />
      <ChessClock timeLeft={blackTime} running={turn === 'black'} />

      <CapturedPieces pieces={capturedBlack} />

      <ChessBoard
        board={board}
        legalMoves={legalMoves}
        lastMove={lastMove}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />

      <CapturedPieces pieces={capturedWhite} />
      <ChessClock timeLeft={whiteTime} running={turn === 'white'} />
      <PlayerHeader name="Dean" rating={1400} isTurn={turn === 'white'} />

      <button
        onClick={() => setShowMoves(true)}
        style={{
          width: '100%',
          maxWidth: 500,
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

      <MoveListDialog
        moves={moveHistory}
        open={showMoves}
        onClose={() => setShowMoves(false)}
      />
    </div>
  )
}
