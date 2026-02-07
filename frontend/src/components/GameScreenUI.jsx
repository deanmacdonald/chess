import React, { useState } from 'react'
import ChessBoard from './ChessBoard'
import { Chess } from 'chess.js'

export default function GameScreenUI() {
  const [game] = useState(new Chess())
  const [board, setBoard] = useState(game.board())

  const refreshBoard = () => {
    setBoard(game.board())
  }

  const onDragStart = (piece, row, col) => {
    // Could add highlight logic later
  }

  const onDragEnd = (piece, fromRow, fromCol, dropX, dropY) => {
    const boardElement = document.querySelector('[data-board]')
    if (!boardElement) return

    const rect = boardElement.getBoundingClientRect()
    const size = rect.width / 8

    const toCol = Math.floor(dropX / size)
    const toRow = Math.floor(dropY / size)

    const fromSquare = fileFromCol(fromCol) + rankFromRow(fromRow)
    const toSquare = fileFromCol(toCol) + rankFromRow(toRow)

    const move = game.move({
      from: fromSquare,
      to: toSquare,
      promotion: 'q',
    })

    if (!move) {
      refreshBoard() // illegal → snap back
      return
    }

    refreshBoard()
  }

  const fileFromCol = (col) => 'abcdefgh'[col] || 'a'
  const rankFromRow = (row) => (8 - row).toString()

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <div data-board>
        <ChessBoard board={board} onDragStart={onDragStart} onDragEnd={onDragEnd} />
      </div>
    </div>
  )
}
