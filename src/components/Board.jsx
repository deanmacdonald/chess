import React, { useMemo, useState } from 'react'
import { Chess } from 'chess.js'
import { sendMove, undoMove, resetGame } from '../sendMove'

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

function squareId(fileIndex, rankIndex) {
  const file = files[fileIndex]
  const rank = 8 - rankIndex
  return `${file}${rank}`
}

export default function Board({ state, onStateChange }) {
  const [selected, setSelected] = useState(null)
  const [legalTargets, setLegalTargets] = useState([])
  const [status, setStatus] = useState(null)
  const [busy, setBusy] = useState(false)
  const [lastMove, setLastMove] = useState(null)
  const [moveList, setMoveList] = useState([])

  const game = useMemo(() => new Chess(state.fen), [state.fen])

  const turn = state.turn === 'w' ? 'White' : 'Black'
  const inCheck = state.inCheck
  const gameOver = state.gameOver
  const checkmate = state.checkmate
  const draw = state.draw

  function handleSquareClick(square) {
    if (busy || gameOver) return

    const piece = game.get(square)

    if (!selected) {
      if (!piece) return
      if (
        (game.turn() === 'w' && piece.color !== 'w') ||
        (game.turn() === 'b' && piece.color !== 'b')
      ) {
        return
      }

      const moves = game.moves({ square, verbose: true })
      setSelected(square)
      setLegalTargets(moves.map((m) => m.to))
      setStatus(null)
      return
    }

    if (selected === square) {
      setSelected(null)
      setLegalTargets([])
      return
    }

    const clickedPiece = game.get(square)
    if (clickedPiece && clickedPiece.color === game.get(selected).color) {
      const moves = game.moves({ square, verbose: true })
      setSelected(square)
      setLegalTargets(moves.map((m) => m.to))
      return
    }

    if (!legalTargets.includes(square)) {
      setStatus('Illegal move')
      return
    }

    doMove(selected, square)
  }

  async function doMove(from, to) {
    setBusy(true)
    setStatus(null)

    const localGame = new Chess(state.fen)
    const move = localGame.move({ from, to, verbose: true })

    const res = await sendMove(from, to)
    setBusy(false)

    if (!res.ok) {
      setStatus(res.error || 'Move rejected')
      return
    }

    setSelected(null)
    setLegalTargets([])
    setLastMove({ from, to })

    if (move) {
      const san = move.san
      setMoveList((prev) => [...prev, san])
    }

    onStateChange(res.state)
  }

  async function handleUndo() {
    if (busy) return
    setBusy(true)
    const res = await undoMove()
    setBusy(false)
    if (!res.ok) {
      setStatus(res.error || 'Nothing to undo')
      return
    }
    setSelected(null)
    setLegalTargets([])
    setLastMove(null)
    setMoveList((prev) => prev.slice(0, -1))
    onStateChange(res.state)
  }

  async function handleReset() {
    if (busy) return
    setBusy(true)
    const res = await resetGame()
    setBusy(false)
    if (!res.ok) {
      setStatus(res.error || 'Reset failed')
      return
    }
    setSelected(null)
    setLegalTargets([])
    setLastMove(null)
    setMoveList([])
    onStateChange(res.state)
  }

  function renderPiece(piece) {
    if (!piece) return null
    const isWhite = piece.color === 'w'
    const map = {
      p: isWhite ? '♙' : '♟',
      n: isWhite ? '♘' : '♞',
      b: isWhite ? '♗' : '♝',
      r: isWhite ? '♖' : '♜',
      q: isWhite ? '♕' : '♛',
      k: isWhite ? '♔' : '♚'
    }
    return (
      <span className={`piece ${isWhite ? 'white-piece' : 'black-piece'}`}>
        {map[piece.type]}
      </span>
    )
  }

  const rows = []
  const board = game.board()

  for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
    const squares = []
    for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
      const sq = squareId(fileIndex, rankIndex)
      const piece = board[rankIndex][fileIndex]
      const isDark = (rankIndex + fileIndex) % 2 === 1
      const isSelected = selected === sq
      const isLegal = legalTargets.includes(sq)
      const isLast = lastMove && (lastMove.from === sq || lastMove.to === sq)

      squares.push(
        <div
          key={sq}
          className={[
            'square',
            isDark ? 'dark-square' : 'light-square',
            isSelected ? 'selected-square' : '',
            isLegal ? 'legal-target' : '',
            isLast ? 'last-move-square' : ''
          ].join(' ')}
          onClick={() => handleSquareClick(sq)}
        >
          {renderPiece(piece)}
        </div>
      )
    }
    rows.push(
      <div className="rank-row" key={rankIndex}>
        {squares}
      </div>
    )
  }

  return (
    <div className="board-layout">
      <div className="board-panel">
        <div className="top-panel">
          <div className="turn-indicator">
            Turn:{' '}
            <span className={state.turn === 'w' ? 'white-text' : 'black-text'}>
              {turn}
            </span>
          </div>
          {inCheck && !gameOver && <div className="check-indicator">Check</div>}
          {gameOver && (
            <div className="checkmate-indicator">
              {checkmate ? 'Checkmate' : draw ? 'Draw' : 'Game over'}
            </div>
          )}
        </div>

        <div className="board">{rows}</div>

        <div className="bottom-panel">
          <button
            className="control-button"
            onClick={handleUndo}
            disabled={busy}
          >
            Undo
          </button>
          <button
            className="control-button"
            onClick={handleReset}
            disabled={busy}
          >
            Reset
          </button>
          {busy && <div className="status-text">Working…</div>}
          {status && <div className="status-text error">{status}</div>}
        </div>
      </div>

      <div className="sidebar-panel">
        <h2 className="sidebar-title">Moves</h2>
        <ol className="move-list">
          {moveList.map((san, idx) => (
            <li key={idx}>{san}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}
