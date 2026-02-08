// src/hooks/useGameState.js
import { useState, useEffect } from 'react'
import { Chess } from 'chess.js'

export default function useGameState() {
  const [game] = useState(new Chess())

  const [turn, setTurn] = useState('white')
  const [whiteTime, setWhiteTime] = useState(300)
  const [blackTime, setBlackTime] = useState(300)

  const [capturedWhite, setCapturedWhite] = useState([])
  const [capturedBlack, setCapturedBlack] = useState([])

  const [moveHistory, setMoveHistory] = useState([])
  const [legalMoves, setLegalMoves] = useState([])
  const [lastMove, setLastMove] = useState(null)

  const [dragFrom, setDragFrom] = useState(null)

  // Clock logic
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

  // Convert row/col → algebraic square ("e4")
  const toSquare = (row, col) => {
    const files = 'abcdefgh'
    return files[col] + (8 - row)
  }

  // DRAG START
  const handleDragStart = (piece, row, col) => {
    const from = toSquare(row, col)
    setDragFrom(from)

    const moves = game.moves({ square: from, verbose: true })
    const formatted = moves.map((m) => ({
      row: 8 - m.to[1],
      col: m.to.charCodeAt(0) - 97,
    }))
    setLegalMoves(formatted)
  }

  // DRAG END
  const handleDragEnd = (piece, fromRow, fromCol, toRow, toCol) => {
    if (!dragFrom) return

    const to = toSquare(toRow, toCol)
    const move = game.move({ from: dragFrom, to, promotion: 'q' })

    if (!move) {
      setLegalMoves([])
      setDragFrom(null)
      return
    }

    // Captures
    if (move.captured) {
      if (move.color === 'w') {
        setCapturedBlack((prev) => [...prev, move.captured])
      } else {
        setCapturedWhite((prev) => [...prev, move.captured])
      }
    }

    // Move history
    setMoveHistory(game.history())

    // Last move highlight
    setLastMove({
      from: {
        row: 8 - move.from[1],
        col: move.from.charCodeAt(0) - 97,
      },
      to: {
        row: 8 - move.to[1],
        col: move.to.charCodeAt(0) - 97,
      },
    })

    // Switch turn
    setTurn(game.turn() === 'w' ? 'white' : 'black')

    setLegalMoves([])
    setDragFrom(null)
  }

  return {
    board: game.board(),
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
  }
}
