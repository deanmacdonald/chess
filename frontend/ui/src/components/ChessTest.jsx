import { useEffect, useState } from 'react'
import { getHealth, makeMove } from '../api/chess'

export default function ChessTest() {
  const [status, setStatus] = useState(null)
  const [moveResponse, setMoveResponse] = useState(null)

  useEffect(() => {
    getHealth().then(setStatus).catch(console.error)
  }, [])

  const sendMove = () => {
    makeMove('e2e4').then(setMoveResponse).catch(console.error)
  }

  return (
    <div>
      <h2>Backend Status</h2>
      <pre>{JSON.stringify(status, null, 2)}</pre>

      <button onClick={sendMove}>Send Move</button>

      <h2>Move Response</h2>
      <pre>{JSON.stringify(moveResponse, null, 2)}</pre>
    </div>
  )
}
