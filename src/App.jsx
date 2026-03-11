import { useEffect, useRef } from 'react'
import { Chessboard } from 'cm-chessboard'
import { loadFEN } from './loadFen.js'
import { sendMove } from './sendMove.js'

export default function App() {
  const boardRef = useRef(null)

  useEffect(() => {
    const board = new Chessboard(boardRef.current, {
      position: 'start',
      sprite: { url: 'pieces.svg' },
      style: { borderRadius: '4px', aspectRatio: 1 }
    })

    // Load backend FEN on startup
    loadFEN(board)

    // Handle user moves
    board.enableMoveInput(async (event) => {
      if (event.type === 'moveInputFinished') {
        const ok = await sendMove(event.squareFrom, event.squareTo, board)
        return ok
      }
    })
  }, [])

  return (
    <div style={{ width: '400px', margin: '20px auto' }}>
      <div ref={boardRef}></div>
    </div>
  )
}
